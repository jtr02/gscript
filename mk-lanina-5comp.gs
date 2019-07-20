function aaa(args)
var=subwrd(args,1)

'set t 1'
'q dim';line=sublin(result,5);  wrd=subwrd(line,6) ; lt=substr(wrd,9,12)
say 'start year 'lt
'reset'
yl=1973
ym=1998
yn=1988
yo=1955
yp=1999
say 'pick up year 'yl' 'ym ' 'yn ' 'yo ' ' yp' '
m=1
e=(yl-lt)*12
f=(ym-lt)*12
g=(yn-lt)*12
h=(yo-lt)*12
i=(yp-lt)*12

'set t 1 24'
'define l'var'=('var'(t+'e')+'var'(t+'f')+'var'(t+'g')+'var'(t+'h')+'var'(t+'i'))/5.0'


