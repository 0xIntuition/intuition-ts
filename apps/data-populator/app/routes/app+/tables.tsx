import React, { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@0xintuition/1ui'

import { columns } from '@components/ui/table/columns'
import { DataTable } from '@components/ui/table/data-table'
import { Thing, thingSchema } from '@components/ui/table/schema/thing'
import UploadCsvButton from '@components/upload-csv-button'
import { fileToText, parseCsv, parseCsvToThings } from '@lib/utils/csv'
import logger from '@lib/utils/logger'
import { proofreadAll } from '@lib/utils/proofread'
import { Play, Save, Upload } from 'lucide-react'
import { z } from 'zod'

export default function Tables() {
  const [csvData, setCsvData] = useState<string[][]>([])
  const [things, setThings] = useState<Thing[]>([])
  async function onFileUpload(file: File) {
    logger('File uploaded:', file)
    const rows = await parseCsv(file)

    logger('Parsed CSV rows:', rows.length)
    setCsvData(rows) // Set the CSV data immediately
    const text = await fileToText(file)
    const things = parseCsvToThings(text)
    setThings(z.array(thingSchema).parse(things))

    const proofreadResult = proofreadAll(rows)
    logger('Proofread result:', proofreadResult)
  }

  const handleDataChange = (newData: Thing[]) => {
    setThings(newData)
    // You can also perform any additional actions here, like saving to a database
  }

  return (
    <div className="container mx-auto p-4 space-y-6 relative">
      <UploadCsvButton onFileUpload={onFileUpload} />
      <DataTable
        columns={columns}
        data={things}
        onDataChange={handleDataChange}
      />
    </div>
  )
}
