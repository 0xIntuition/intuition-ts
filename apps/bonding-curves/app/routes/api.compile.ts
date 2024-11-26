import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData()
    const fileName = (formData.get('file') as File).name
    let content = formData.get('content') as string

    if (!fileName || !content) {
      return json(
        { error: 'File name and content are required' },
        { status: 400 }
      )
    }

    try {
      // Save to container and compile
      const escapedContent = content
        .replace(/"/g, '\\"')
        .replace(
          /import\s*{BaseCurve}\s*from\s*([^"']\S+);/g,
          'import {BaseCurve} from \\"./BaseCurve.sol\\";'
        )

      await execAsync(`docker exec bonding-curves-anvil-1 bash -c "echo '${escapedContent}' > /app/contracts/${fileName}"`)

      // Compile
      let { stdout, stderr } = await execAsync('docker exec bonding-curves-anvil-1 forge build --force --sizes')
      console.log('Compilation output:', stdout)
      if (stderr) {
        console.error('Compilation errors:', stderr)
        return json({ error: 'Compilation failed', details: stderr }, { status: 400 })
      }

      // Get artifact
      const contractName = path.parse(fileName).name
      const { stdout: artifactContent } = await execAsync(
        `docker exec bonding-curves-anvil-1 cat /app/out/${fileName}/${contractName}.json`
      )

      let artifact
      try {
        artifact = JSON.parse(artifactContent)
      } catch (error) {
        console.error('Failed to parse artifact:', error)
        return json({ error: 'Failed to read contract artifact' }, { status: 500 })
      }

      // Find constructor and log for debugging
      const constructor = artifact.abi.find((item: any) => item.type === 'constructor')
      console.log('Found constructor:', constructor)

      // If no constructor found, return empty inputs array
      const constructorInputs = constructor?.inputs || []
      const needsConstructorArgs = constructorInputs.length > 0

      return json({
        abi: artifact.abi,
        bytecode: artifact.bytecode.object,
        constructorInputs,
        needsConstructorArgs
      })

    } catch (error) {
      console.error('Compilation failed:', error)
      return json(
        { error: error instanceof Error ? error.message : 'Contract compilation failed' },
        { status: 500 }
      )
    } finally {
      // Always clean up
      try {
        await execAsync(`docker exec bonding-curves-anvil-1 rm /app/contracts/${fileName}`)
      } catch (cleanupError) {
        console.error('Failed to clean up temporary file:', cleanupError)
      }
    }
  } catch (error) {
    console.error('Error:', error)
    return json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 