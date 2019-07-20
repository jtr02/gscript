function mkpng(args)

if(args='')
say '----------------------------------------'
say '- Function Name : [MKPNG]'
say '-- Usage :'
say '--- mkpng A'
say '---- A : *.png'
say '----- output A[png] to Img[dir]'
say '----------------------------------------'
return
endif

oppng=subwrd(args,1)

say 'output PNG = 'oppng

'!mkdir -p Img'
'gxprint a.eps'
'!convert -rotate +90 -density 100 -trim +repage -bordercolor white -border 20x20 a.eps Img/'oppng
'!rm -f a.eps'

return
