function getfile(args)

if(args='')
say '----------------------------------------'
say '- Function Name : [GETFILE]'
say '-- Usage :'
say '--- getfile A'
say '---- A : File number'
say '----------------------------------------'
return
endif

dfile=subwrd(args,1)
'q file 'dfile

str=sublin(result,5)
nx=subwrd(str,3)
ny=subwrd(str,6)
nz=subwrd(str,9)
nt=subwrd(str,12)
ne=subwrd(str,15)

say 'nx='nx
say 'ny='ny
say 'nz='nz
say 'nt='nt
say 'ne='ne

str=sublin(result,6)
nv=subwrd(str,5)

say 'nv='nv

l=7
while(l<=99)
i=l-6

str=sublin(result,l)
var=subwrd(str,1)

if(var!='')
var.i=var
say 'var.'i'='var.i
else
break
endif

l=l+1
endwhile

return
