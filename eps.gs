function eps(args)
psname=subwrd(args,1)

'enable print 'psname'.gm' 
'print' 
'disable print'
'!gxeps -c -l -i  'psname'.gm -o 'psname'.eps'
'!rm 'psname'.gm'

