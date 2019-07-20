function clim(args)
var=subwrd(args,1)
varclim=subwrd(args,2)

'set t 1 12'
'define 'varclim'=ave('var',t+0,t=12,1yr)'
'modify 'varclim' seasonal'
 


