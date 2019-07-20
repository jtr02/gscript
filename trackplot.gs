* help is in the end of this script
*
function trackplot(args)

  if( args = '' )
    help()
    return
  endif

***** Default value *****
color='1'
style='1'
thick='5'
long1='none'
lati1='none'
long2='none'
lati2='none'

***** Arguement *****
  i = 1
  while(1)
    arg = subwrd( args, i )
    i = i + 1;
    if( arg = '' ); break; endif

    while(1)
*** option
      if( arg = '-c' )  ; color=subwrd(args,i); i=i+1; break; endif
      if( arg = '-l' )  ; style=subwrd(args,i); i=i+1; break; endif
      if( arg = '-t' )  ; thick=subwrd(args,i); i=i+1; break; endif

*** lon, lat
      if( valnum(arg)!=0 & long1!='none' & lati1!='none' & long2!='none' & lati2='none' ); lati2=arg; break; endif
      if( valnum(arg)!=0 & long1!='none' & lati1!='none' & long2='none' ); long2=arg; break; endif
      if( valnum(arg)!=0 & long1!='none' & lati1='none' ); lati1=arg; break; endif
      if( valnum(arg)!=0 & long1='none' ); long1=arg; break; endif

      say 'syntax error : 'arg
      return

    endwhile
  endwhile

say 'color='color
say 'style='style
say 'thick='thick

'q w2xy 'long1' 'lati1
x1=subwrd(result,3)
y1=subwrd(result,6)
say 'long1='long1' -> x1='x1' lati1='lati1' -> y1='y1
'q w2xy 'long2' 'lati2
x2=subwrd(result,3)
y2=subwrd(result,6)
say 'long2='long2' -> x2='x2' lati2='lati2' -> y2='y2
'set line 'color' 'style' 'thick
'draw line 'x1' 'y1' 'x2' 'y2

*******
* help
*
function help()
  say ' Name:'
  say '   trackplot - draw line from (lon1,lat1) to (lon2,lat2)'
  say '                             written by Y.Kamae 09/10/16'
  say ''
  say ' Usage:'
  say '   trackplot long1 lati1 long2 lati2'
  say '            [-c color]'
  say '            [-l style]'
  say '            [-t thick]'
  say ''
  say '     color           : color of line (default=1:black/white)'
  say '     style           : style of line (default=1:solid line)'
  say '     thick           : thickness of line (default=5)'
  say ''

return
