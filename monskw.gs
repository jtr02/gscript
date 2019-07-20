
function skw(args) 

var=subwrd(args,1)
tst=subwrd(args,2)
tend=subwrd(args,3)
tnum=tend-tst+1
tnummon=tnum/12

'monclim 'var' 'var'clim  'tst' 'tend' '

'asym =sum(('var'-'var'clim)*('var'-'var'clim)*('var'-'var'clim)/'tnum',t='tst',t='tend')/pow(sum(('var'-'var'clim)*('var'-'var'clim)/'tnum',t='tst',t='tend'),1/2)'
'skw =sum(('var'-'var'clim)*('var'-'var'clim)*('var'-'var'clim)/'tnum',t='tst',t='tend')/pow(sum(('var'-'var'clim)*('var'-'var'clim)/'tnum',t='tst',t='tend'),3/2)'

'set t 1 12'
'monasym =sum(('var'-'var'clim)*('var'-'var'clim)*('var'-'var'clim)/'tnummon',t+0,t='tend',12)/pow(sum(('var'-'var'clim)*('var'-'var'clim)/'tnummon',t+0,t='tend',12),1/2)'
'monskw =sum(('var'-'var'clim)*('var'-'var'clim)*('var'-'var'clim)/'tnummon',t+0,t='tend',12)/pow(sum(('var'-'var'clim)*('var'-'var'clim)/'tnummon',t+0,t='tend',12),3/2)'

