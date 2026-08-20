Add-Type -AssemblyName System.IO.Compression.FileSystem
$sourcePath = (Get-Item .).FullName + "\"
$zipPath = (Get-Item .).FullName + "\project_backup2.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath }
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')

Get-ChildItem -Path $sourcePath -Recurse -File | Where-Object { 
  $_.FullName -notmatch '\\node_modules\\' -and 
  $_.FullName -notmatch '\\\.git\\' -and 
  $_.FullName -notmatch '\\dist\\' -and 
  $_.FullName -notmatch '\\dist-server\\' -and 
  $_.FullName -notmatch '\\\.openclaude\\' -and 
  $_.Name -ne 'teste-orcamento.pdf' -and 
  $_.Name -notmatch 'project_backup' -and
  $_.Name -ne 'video.gif'
} | ForEach-Object {
    $relativePath = $_.FullName.Substring($sourcePath.Length)
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relativePath)
}
$zip.Dispose()
Write-Host "Zip created properly."
