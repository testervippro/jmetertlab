# Variables
$version = "5.6.3"  # Change this to the version you want
$jmeterUrl = "https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-$version.zip"
$destination = "$env:USERPROFILE\Downloads"
$installPath = "C:\Tools\JMeter"

# Create directories if needed
if (-Not (Test-Path $destination)) {
    New-Item -Path $destination -ItemType Directory
}
if (-Not (Test-Path $installPath)) {
    New-Item -Path $installPath -ItemType Directory
}

# Download JMeter zip
Write-Host "Downloading JMeter $version..."
$zipPath = "$destination\apache-jmeter-$version.zip"
Invoke-WebRequest -Uri $jmeterUrl -OutFile $zipPath

# Extract zip
Write-Host "Extracting JMeter..."
Expand-Archive -Path $zipPath -DestinationPath $installPath -Force

# Get the bin path
$jmeterBinPath = Join-Path -Path $installPath -ChildPath "apache-jmeter-$version\bin"

# Add to system PATH
Write-Host "Adding JMeter to system PATH..."
$oldPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine)
if ($oldPath -notlike "*$jmeterBinPath*") {
    $newPath = "$oldPath;$jmeterBinPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, [EnvironmentVariableTarget]::Machine)
    Write-Host " JMeter path added successfully. Please restart your terminal or computer."
} else {
    Write-Host " JMeter path already exists in system PATH."
}
