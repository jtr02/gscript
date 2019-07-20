* help is in the end of this script
*
function auxlinex(args)

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
  xmin = 'none'
  xmax = 'none'
  y = 'none'

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
      if( valnum(arg)!=0 & xmin!='none' & xmax!='none' & y='none' ); y=arg; break; endif
      if( valnum(arg)!=0 & xmin!='none' & xmax='none' ); xmax=arg; break; endif
      if( valnum(arg)!=0 & xmin='none' ); xmin=arg; break; endif

      say 'syntax error : 'arg
      return

    endwhile
  endwhile

say 'xmin='xmin
say 'xmax='xmax
say 'y='y
say 'color='color
say 'thick='thick
say 'size='size
say 'start='start
int=(xmax-xmin)/num/div
say 'int='int
if(start=0)
x1=xmin
else
x1=xmin+int/start
endif
while(x1<=xmax)
'set line 'color' 1 'thick
'draw line 'x1' 'y' 'x1' 'y-size
x1=x1+int
endwhile


*******
* help
*
function help()
  say ' Name:'
  say '   auxlinex - draw auxiliary scale lines'
  say '             written by Y.Kamae 09/09/22'
  say ' '
  say ' Usage:'
  say '   auxlinex xmin xmax y'
  say '           [-c color]'
  say '           [-th thickness]'
  say '           [-d div]'
  say '           [-n num]'
  say '           [-s size]'
  say '           [-st start]'
  say ''
  say '     xmin~xmax, y    : the position of the x axis (on GrADS 11x8.5 coordinate)'
  say '     color           : color of lines (default=1)'
  say '     thickness       : thickness of lines (default=4)'
  say '     div             : the number dividing one interval on x axis by auxiliary scale lines'
  say '     num             : number of the intervals on x axis devided by scale lines'
  say '     size            : size of lines'
  say '                       (positive value: draw line southward)'
  say '                       (negative value: draw line northward)'
  say '     start           : dividing number representing where the first line is drawn (default=0)'
  say '     (e.g. half:2, one third:3, two third:1.5, one sixth:6)'
  say ''
  say ' Note:'
  say '  You should set "parea" before this sentence.'
  say ''

return
