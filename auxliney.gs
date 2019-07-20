* help is in the end of this script
*
function auxliney(args)

  if( args = '' )
    help()
    return
  endif

***** Default value *****
  color = '1'
  thick = '4'
  div = '5'
  num = '6'
  size = '0.05'
  start = '0'
  x = 'none'
  ymin = 'none'
  ymax = 'none'

***** Arguement *****
  i = 1
  while(1)
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while(1)
*** option
      if( arg = '-c' )  ; color=subwrd(args,i); i=i+1; break; endif
      if( arg = '-th' )  ; thick=subwrd(args,i); i=i+1; break; endif
      if( arg = '-d' )  ; div=subwrd(args,i); i=i+1; break; endif
      if( arg = '-n' )  ; num=subwrd(args,i); i=i+1; break; endif
      if( arg = '-s' )  ; size=subwrd(args,i); i=i+1; break; endif
      if( arg = '-st' )  ; start=subwrd(args,i); i=i+1; break; endif

*** xmin, xmax, y
      if( valnum(arg)!=0 & x!='none' & ymin!='none' & ymax='none' ); ymax=arg; break; endif
      if( valnum(arg)!=0 & x!='none' & ymin='none' ); ymin=arg; break; endif
      if( valnum(arg)!=0 & x='none' ); x=arg; break; endif

      say 'syntax error : 'arg
      return

    endwhile
  endwhile

say 'x='x
say 'ymin='ymin
say 'ymax='ymax
say 'color='color
say 'thick='thick
say 'size='size
say 'start='start
int=(ymax-ymin)/num/div
say 'int='int
if(start=0)
y1=ymin
else
y1=ymin+int/start
endif
while(y1<=ymax)
'set line 'color' 1 'thick
'draw line 'x' 'y1' 'x-size' 'y1
y1=y1+int
endwhile


*******
* help
*
function help()
  say ' Name:'
  say '   auxliney - draw auxiliary scale lines'
  say '             written by Y.Kamae 09/09/22'
  say ' '
  say ' Usage:'
  say '   auxliney x ymin ymax'
  say '           [-c color]'
  say '           [-th thickness]'
  say '           [-d div]'
  say '           [-n num]'
  say '           [-s size]'
  say '           [-st start]'
  say ''
  say '     x, ymin~ymax    : the position of the y axis (on GrADS 11x8.5 coordinate)'
  say '     color           : color of lines (default=1)'
  say '     thickness       : thickness of lines (default=4)'
  say '     div             : the number dividing one interval on y axis by auxiliary scale lines'
  say '     num             : number of the intervals on y axis devided by scale lines'
  say '     size            : size of lines'
  say '                       (positive value: draw line westward)'
  say '                       (negative value: draw line eastward)'
  say '     start           : dividing number representing where the first line is drawn (default=0)'
  say '     (e.g. half:2, one third:3, two third:1.5, one sixth:6)'
  say ''
  say ' Note:'
  say '  You should set "parea" before this sentence.'
  say ''

return
