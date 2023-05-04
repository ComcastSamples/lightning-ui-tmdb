https://docs.imgtec.com/tools-manuals/pvrtextool-manual/topics/cli/command-line-options.html
https://github.com/rdkcentral/Lightning/blob/master/examples/texture-compression/texture-compression.html

xargs -n 1 <urls.txt curl -O -L
ls *.jpg | xargs -L1 PVRTexToolCLI -f s3tc -o ktx -i
