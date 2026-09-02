#define AppName "Saiko Inventory"
#define AppVersion "1.1.0"
#define AppExeName "SaikoInventory.exe"

[Setup]
AppId={{B4EAA229-A585-49E8-A7BD-23BB4FAE1177}
AppName={#AppName}
AppVersion={#AppVersion}
DefaultDirName={autopf}\Saiko Inventory
DefaultGroupName=Saiko Inventory
OutputDir=installer-output
OutputBaseFilename=SaikoInventorySetup
SetupIconFile=assets\saiko-icon.ico
UninstallDisplayIcon={app}\{#AppExeName}
PrivilegesRequired=admin
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
Compression=lzma2
SolidCompression=yes
WizardStyle=modern

[Files]
Source: "dist\SaikoInventory.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\Saiko Inventory"; Filename: "{app}\{#AppExeName}"
Name: "{autodesktop}\Saiko Inventory"; Filename: "{app}\{#AppExeName}"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional shortcuts:"; Flags: checkedonce

[Run]
Filename: "{app}\{#AppExeName}"; Description: "Open Saiko Inventory"; Flags: nowait postinstall skipifsilent
