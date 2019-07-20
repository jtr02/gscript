function clim(args)
var=subwrd(args,1)
varclim=subwrd(args,2)
tst=subwrd(args,3)
ten=subwrd(args,4)
tst2=tst+12

'set t 'tst' 'tst2''
'define 'varclim'=ave('var',t+0,t='ten',1yr)'
'modify 'varclim' seasonal'

'set t 'tst''


