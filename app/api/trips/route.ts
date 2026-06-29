import { NextResponse } from "next/server"
import path from "path"
import fs from "fs/promises"

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), "data")
  const fileContents = await fs.readFile(jsonDirectory + "/trips.json", "utf8")
  return NextResponse.json(JSON.parse(fileContents))
}
