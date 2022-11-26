# UIColors cli tool
A simple CLI tool for creating tailwind color palletes, built upon [uicolors.app](https://uicolors.app/create)

## installation
### installing executable
1. download executable for your platform from latest release
2. make it accesible from the command line
	```zsh
	# creating a symlink
	ln -s /download-directory/uicolors-(your-platform) /usr/local/bin/uicolors
	# or just rename & place the file there directly.
	```
## usage
```zsh
uicolors add --color ff0000 --name red
# shorthands
uicolors add -c ff0000 -n red
```
