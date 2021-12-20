# Vite-based glowsite!

To run:

```
vite root/csr
```

To build for prod:
```
pnpm run generate
pnpm run serve
```

On WSL you need to:
```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt -y install ./google-chrome-stable_current_amd64.deb
```

To change antd theme:

edit `src/glowsite-theme.less` and `pnpm run theme`


https://github.com/glowbuzzer/glowsite/runs/4209112874?check_suite_focus=true