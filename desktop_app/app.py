import sys
from pathlib import Path
import webview
from backend_config import APP_URL

def main():
    icon = Path(getattr(sys, "_MEIPASS", Path(__file__).parent)) / "assets" / "saiko-icon.ico"
    webview.create_window("Saiko Inventory", APP_URL, width=1280, height=800,
                          min_size=(1000, 680), background_color="#111111")
    webview.start(icon=str(icon) if icon.exists() else None, private_mode=False)

if __name__ == "__main__":
    main()
