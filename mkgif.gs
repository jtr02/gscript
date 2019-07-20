function mkgif(args)

ipeps=subwrd(args,1)
opgif=subwrd(args,2)

'!convert -rotate +90 -density 100 -trim +repage -bordercolor white -border 20x20 -delay 13 -loop 0 'ipeps' 'opgif

return
