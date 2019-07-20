* help is in the end of this script
*
function regline(args)

  if( args = '' )
    help()
    return
  endif

***** Default value *****
color='1'
style='1'
thick='5'
var1='none'
var2='none'

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

*** var1, var2
      if( var1!='none' & var2='none' ); var2=arg; break; endif
      if( var1='none' ); var1=arg; break; endif

      say 'syntax error : 'arg
      return

    endwhile
  endwhile

say 'color='color
say 'style='style
say 'thick='thick
say 'var1='var1
say 'var2='var2

*var1=subwrd(args, 1)
*var2=subwrd(args, 2)

'q dims'
lin=sublin(result, 5)
st=subwrd(lin, 11)
et=subwrd(lin, 13)
'set t 'st
'vave=ave('var1',t='st',t='et')'
'v2ave=ave('var2',t='st',t='et')'
'd tcorr('var1', 'var2', t='st', t='et')'
lin=sublin(result, 2)
wrd=subwrd(lin, 4)
cor=substr(wrd, 1, 6)
say 'cor='cor
'd tregr('var1', 'var2', t='st', t='et')'
lin=sublin(result, 2)
wrd=subwrd(lin, 4)
reg=substr(wrd, 1, 6)
say 'reg='reg
'reg=tregr('var1', 'var2', t='st', t='et')'

'vmin=min('var1', t='st', t='et')'
'd vmin'
vmin=subwrd(result, 4)
'vmax=max('var1', t='st', t='et')'
'd vmax'
vmax=subwrd(result, 4)

'd v2ave-reg*(vave-vmin)'
v2min=subwrd(result, 4)
'q w2xy 'vmin' 'v2min
xmin=subwrd(result, 3)
ymin=subwrd(result, 6)
'd v2ave+reg*(vmax-vave)'
v2max=subwrd(result, 4)
'q w2xy 'vmax' 'v2max
xmax=subwrd(result, 3)
ymax=subwrd(result, 6)

'set gxout line'
'set line 'color' 'style' 'thick
'draw line 'xmin' 'ymin' 'xmax' 'ymax

*
* help
*
function help()
  say ' Name:'
  say '   regline  - draw regression line on scatter diagram'
  say '                         written by Y. Kamae 09/12/06'
  say ' '
  say ' Usage:'
  say '   regline  var1 var2'
  say '            [-c color]'
  say '            [-l style]'
  say '            [-t thick]'
  say ''
  say '     color           : color of line (default=1:black/white)'
  say '     style           : style of line (default=1:solid line)'
  say '     thick           : thickness of line (default=5)'
  say ''

return
