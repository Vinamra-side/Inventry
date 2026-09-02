import webview
from backend_config import APP_URL

def main():
    webview.create_window("Saiko Inventory", APP_URL, width=1280, height=800,
                          min_size=(1000, 680), background_color="#111111")
    webview.start(private_mode=False)

if __name__ == "__main__":
    main()
