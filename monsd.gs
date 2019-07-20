function monsd(args)
var=subwrd(args,1)
varsd=subwrd(args,2)
tst=subwrd(args,3)
ten=subwrd(args,4)
tst2=tst+12

'set t 'tst' 'tst2''
'define varave=ave('var',t+0,t='ten',1yr)'
'modify varave seasonal'

'define 'varsd'=sqrt(ave(('var'-varave)*('var'-varave),t+0,t='ten',1yr))'

'set t 'tst''
