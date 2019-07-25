function getstat(args)

if(args='')
say '----------------------------------------'
say '- Function Name : [GETSTAT]'
say '-- Usage :'
say '--- getstat A'
say '---- A : Element'
say '----- get statistical information'
say '----------------------------------------'
return
endif

elem=subwrd(args,1)

say 'get statistical information : 'elem

'set gxout stat'
'd 'elem

str=sublin(result,5)
ni=subwrd(str,3);nj=subwrd(str,4);nij=subwrd(str,5)
say 'ni='ni', nj='nj', nij='nij

str=sublin(result,6)
undef=subwrd(str,4)
say 'undef value='undef

str=sublin(result,7)
nundef=subwrd(str,4);nvalid=subwrd(str,8)
say 'undef count='nundef
say 'valid count='nvalid

str=sublin(result,8)
min=subwrd(str,4);max=subwrd(str,5)
say 'min='min
say 'max='max

str=sublin(result,11)
avr=subwrd(str,2)
say 'avr='avr

str=sublin(result,13)
sgm=subwrd(str,2)
say 'sgm='sgm

str=sublin(result,14)
sgma=subwrd(str,2)
say 'sgma='sgma

'set gxout grid'

return
