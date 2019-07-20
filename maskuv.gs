function aaa(args)
uvar=subwrd(args,1)
vvar=subwrd(args,2)
maskvalue=subwrd(args,3)

arange=maskvalue*5
'set arrscl 0.5 'arange' '
'd maskout('uvar',mag('uvar','vvar')-'maskvalue');'vvar'  '


