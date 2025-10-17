import { App, InstallMethod } from "@/types";

export class ScriptGenerator {
  private selectedApps: App[];
  private installMethod: InstallMethod;

  constructor(selectedApps: App[], installMethod: InstallMethod) {
    this.selectedApps = selectedApps;
    this.installMethod = installMethod;
  }

  private generateHeader(): string {
    return `@echo off
:: ========================================
::   Ultimate App Installer Script
::   Generated on ${new Date().toLocaleString()}
::   Total Apps: ${this.selectedApps.length}
::   Install Method: ${this.installMethod.toUpperCase()}
:: ========================================

echo.
echo ========================================
echo   Ultimate App Installer
echo ========================================
echo.
echo Installing ${this.selectedApps.length} application(s)...
echo This may take a while. Please be patient.
echo.

:: Check for admin rights
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: This script requires Administrator privileges!
    echo Please right-click and select "Run as administrator"
    pause
    exit /b 1
)

:: Create temp directory for downloads
set "DOWNLOAD_DIR=%TEMP%\\AppInstaller"
if not exist "%DOWNLOAD_DIR%" mkdir "%DOWNLOAD_DIR%"

`;
  }

  private generatePackageManagerChecks(): string {
    let script = "";

    if (this.installMethod === "auto" || this.installMethod === "winget") {
      script += `:: Check for winget
echo Checking for winget...
winget --version >nul 2>&1
if %errorlevel% equ 0 (
    set "WINGET_AVAILABLE=1"
    echo [OK] Winget is available
) else (
    set "WINGET_AVAILABLE=0"
    echo [WARNING] Winget is not available
)
echo.

`;
    }

    if (this.installMethod === "auto" || this.installMethod === "choco") {
      script += `:: Check for Chocolatey
echo Checking for Chocolatey...
choco --version >nul 2>&1
if %errorlevel% equ 0 (
    set "CHOCO_AVAILABLE=1"
    echo [OK] Chocolatey is available
) else (
    set "CHOCO_AVAILABLE=0"
    echo [WARNING] Chocolatey is not available
    echo Installing Chocolatey...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
    if %errorlevel% equ 0 (
        set "CHOCO_AVAILABLE=1"
        echo [OK] Chocolatey installed successfully
        refreshenv
    )
)
echo.

`;
    }

    return script;
  }

  private generateAppInstallation(app: App, index: number): string {
    const appId = app.id.toUpperCase().replace(/-/g, "_");

    let script = `
:: ========================================
:: [${index + 1}/${this.selectedApps.length}] ${app.name}
:: ========================================
echo.
echo Installing ${app.name}...
`;

    if (this.installMethod === "auto") {
      // Smart installation logic
      if (app.winget) {
        script += `
if %WINGET_AVAILABLE%==1 (
    echo [Method: Winget]
    winget install --id ${app.winget} --silent --accept-package-agreements --accept-source-agreements
    if %errorlevel% equ 0 (
        echo [OK] ${app.name} installed successfully via winget
        goto :END_${appId}
    ) else (
        echo [WARNING] Winget installation failed, trying alternative...
    )
)
`;
      }

      if (app.choco) {
        script += `
if %CHOCO_AVAILABLE%==1 (
    echo [Method: Chocolatey]
    choco install ${app.choco} -y --ignore-checksums
    if %errorlevel% equ 0 (
        echo [OK] ${app.name} installed successfully via Chocolatey
        goto :END_${appId}
    ) else (
        echo [WARNING] Chocolatey installation failed, trying direct download...
    )
)
`;
      }

      if (app.directUrl) {
        script += this.generateDirectDownload(app, appId);
      }
    } else if (this.installMethod === "winget" && app.winget) {
      script += `
echo [Method: Winget]
winget install --id ${app.winget} --silent --accept-package-agreements --accept-source-agreements
if %errorlevel% equ 0 (
    echo [OK] ${app.name} installed successfully
) else (
    echo [ERROR] Failed to install ${app.name}
)
`;
    } else if (this.installMethod === "choco" && app.choco) {
      script += `
echo [Method: Chocolatey]
choco install ${app.choco} -y --ignore-checksums
if %errorlevel% equ 0 (
    echo [OK] ${app.name} installed successfully
) else (
    echo [ERROR] Failed to install ${app.name}
)
`;
    } else if (this.installMethod === "direct" && app.directUrl) {
      script += this.generateDirectDownload(app, appId);
    }

    script += `
:END_${appId}
`;

    return script;
  }

  private generateDirectDownload(app: App, appId: string): string {
    const extension = app.directUrl?.includes(".msi") ? "msi" : "exe";

    return `
echo [Method: Direct Download]
echo Downloading from: ${app.directUrl}
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; try { Invoke-WebRequest -Uri '${
      app.directUrl
    }' -OutFile '%DOWNLOAD_DIR%\\${
      app.id
    }_installer.${extension}' -UseBasicParsing -ErrorAction Stop } catch { Write-Host 'Download failed' }}"
if exist "%DOWNLOAD_DIR%\\${app.id}_installer.${extension}" (
    echo Installing ${app.name}...
    ${
      extension === "msi"
        ? `msiexec /i "%DOWNLOAD_DIR%\\${app.id}_installer.${extension}" ${app.silentArgs}`
        : `"%DOWNLOAD_DIR%\\${app.id}_installer.${extension}" ${app.silentArgs}`
    }
    timeout /t 5 /nobreak >nul
    del "%DOWNLOAD_DIR%\\${app.id}_installer.${extension}"
    echo [OK] ${app.name} installation completed
) else (
    echo [ERROR] Failed to download ${app.name}
)
`;
  }

  private generateFooter(): string {
    return `
:: ========================================
::   Installation Complete
:: ========================================
echo.
echo ========================================
echo   All installations completed!
echo ========================================
echo.
echo Installed ${this.selectedApps.length} application(s)
echo.
echo Please restart your computer if required by any application.
echo.

:: Cleanup
rmdir /s /q "%DOWNLOAD_DIR%" 2>nul

echo Press any key to exit...
pause >nul
`;
  }

  public generate(): string {
    let script = this.generateHeader();
    script += this.generatePackageManagerChecks();

    this.selectedApps.forEach((app, index) => {
      script += this.generateAppInstallation(app, index);
    });

    script += this.generateFooter();

    return script;
  }
}
