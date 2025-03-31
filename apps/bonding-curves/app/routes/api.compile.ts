import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'
import os from 'os'

const execAsync = promisify(exec)
const isProduction = process.env.NODE_ENV === 'production'

export const action: ActionFunction = async ({ request }) => {
  let fileName: string | null = null
  let tempFilePath: string | null = null

  try {
    const formData = await request.formData()
    fileName = (formData.get('file') as File).name
    let content = formData.get('content') as string

    if (!fileName || !content) {
      return json({ error: 'File name and content are required' }, { status: 400 })
    }

    // Clean up the contract code
    content = content
      .replace(/\bIMMUTABLE\b(?!\s+[a-zA-Z_])/g, '')
      .replace(/import\s*{?\s*console\s*}?\s*from\s*["']forge-std\/console\.sol["'];?\s*/g, '')
      .replace(/console\.log\s*\([^;]*\);?\s*/g, '')
      .replace(/import\s*{[^}]*}\s*from\s*["'][^"']*\/test\/[^"']*["'];?\s*/g, '')
      .replace(/using\s+StringUtils\s+for\s+(?:u?int256);?\s*/g, '')
      .replace(
        /import\s*{[^}]*BaseCurve[^}]*}\s*from\s*["'][^"']*["'];/g,
        'import {BaseCurve} from "./BaseCurve.sol";'
      )
      .replace(
        /import\s*{[^}]*IBaseCurve[^}]*}\s*from\s*["'][^"']*["'];/g,
        'import {IBaseCurve} from "./IBaseCurve.sol";'
      )
      .replace(
        /import\s*{[^}]*Errors[^}]*}\s*from\s*["'][^"']*["'];/g,
        'import {Errors} from "./Errors.sol";'
      )

    let compileResult: { stdout: string; stderr: string }

    // Create a temporary file
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'contract-'))
    tempFilePath = path.join(tempDir, fileName)
    await fs.writeFile(tempFilePath, content)

    if (isProduction) {
      // Production: Direct file operations and compilation
      await fs.mkdir('/app/out', { recursive: true })
      await fs.mkdir('/app/contracts', { recursive: true })
      await fs.copyFile(tempFilePath, '/app/contracts/' + fileName)

      compileResult = await execAsync(
        'forge build --force --sizes --out /app/out --contracts /app/contracts --lib-paths /app/lib -vvv'
      )
    } else {
      // Development: Execute through Docker
      await execAsync('docker exec bonding-curves-anvil-1 mkdir -p /app/contracts /app/out')
      await execAsync(`docker cp ${tempFilePath} bonding-curves-anvil-1:/app/contracts/${fileName}`)
      compileResult = await execAsync('docker exec bonding-curves-anvil-1 forge build --force --sizes')
    }

    if (compileResult.stderr) {
      return json({ error: 'Compilation failed', details: compileResult.stderr }, { status: 400 })
    }

    // Read the compiled artifact
    const contractName = path.parse(fileName).name
    const artifactPath = `/app/out/${contractName}.sol/${contractName}.json`

    let artifactContent: string
    if (isProduction) {
      artifactContent = await fs.readFile(artifactPath, 'utf-8')
    } else {
      const { stdout } = await execAsync(`docker exec bonding-curves-anvil-1 cat ${artifactPath}`)
      artifactContent = stdout
    }

    const artifact = JSON.parse(artifactContent)
    const constructor = artifact.abi.find((item: any) => item.type === 'constructor')

    return json({
      abi: artifact.abi,
      bytecode: artifact.bytecode.object,
      constructorInputs: constructor?.inputs || [],
      needsConstructorArgs: (constructor?.inputs || []).length > 0
    })

  } catch (error) {
    console.error('Error:', error)
    return json({ error: 'Contract compilation failed' }, { status: 500 })
  } finally {
    // Clean up temporary files and contract files
    if (tempFilePath) {
      await fs.rm(path.dirname(tempFilePath), { recursive: true, force: true }).catch(() => { })
    }
    if (fileName) {
      const cleanupCmd = isProduction
        ? () => fs.unlink('/app/contracts/' + fileName).catch(() => { })
        : () => execAsync(`docker exec bonding-curves-anvil-1 rm /app/contracts/${fileName}`).catch(() => { })
      await cleanupCmd()
    }
  }
} 