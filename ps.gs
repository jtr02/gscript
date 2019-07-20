
function ps(args)

psname=subwrd(args,1)

'enable print 'psname'.gm' 
'print' 
'disable print'
'!gxps -i -c 'psname'.gm -o 'psname'.ps'
'!rm 'psname'.gm'
return
