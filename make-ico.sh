#!/bin/bash
cd ./public
convert -background transparent favicon_512.png -define icon:auto-resize=16,32,48,64,256 favicon.ico
