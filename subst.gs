*
* Help is in the end of this script
*
function subst( args )
  _version='0.01r1'

  if( args = '' )
    help()
    return
  endif

  name  = subwrd( args, 1 )
  'value = 'subwrd( args, 2 )
  temp  = subwrd( args, 3 )
  if( temp != 'at' ) ; say 'syntax error in subst.gs' ; exit ; endif

  temp  = subwrd( args, 4 )
  i = 1
  g = 1
  len = math_strlen( temp )
  start = 1
  grid.1.1 = -1
  grid.2.1 = -1
  while( i <= len )
    c = substr( temp, i, 1 )

    if( c = ':' )
      grid.g.1 = substr( temp, start, i-start )
      start = i + 1
    endif

    if( c = ',' )
      grid.g.2 = substr( temp, start, i-start )
      start = i + 1
      g = g + 1
    endif

    if( len = i )
      grid.g.2 = substr( temp, start, i-start+1 )
      start = i + 1
    endif

    i = i + 1
  endwhile

  if( grid.1.1 = -1 ) ; grid.1.1 = grid.1.2 ; endif
  if( grid.2.1 = -1 ) ; grid.2.1 = grid.2.2 ; endif

  qdims()

  'set '_gdim.1' 'grid.1.1
  world.1.1 = subwrd( qdim( _gdim.1 ), 6 )
  'set '_gdim.1' 'grid.1.2
  world.1.2 = subwrd( qdim( _gdim.1 ), 6 )
  'set '_gdim.1' 'grid.1.1+1
  dworld.1 = 0.5 * ( subwrd( qdim( _gdim.1 ), 6 ) - world.1.1 )
  'set '_gdim.1' '_gmin.1' '_gmax.1

  'set '_gdim.2' 'grid.2.1
  world.2.1 = subwrd( qdim( _gdim.2 ), 6 )
  'set '_gdim.2' 'grid.2.2
  world.2.2 = subwrd( qdim( _gdim.2 ), 6 )
  'set '_gdim.2' 'grid.2.1+1
  dworld.2 = 0.5 * ( subwrd( qdim( _gdim.2 ), 6 ) - world.2.1 )
  'set '_gdim.2' '_gmin.2' '_gmax.2

  str.1 = '( '_wdim.1' - ( 'world.1.1' - 'dworld.1' ) ) * ( '_wdim.1' - ( 'world.1.2' + 'dworld.1' ) )'
  str.2 = '( '_wdim.2' - ( 'world.2.1' - 'dworld.2' ) ) * ( '_wdim.2' - ( 'world.2.2' + 'dworld.2' ) )'

  name' = 'name' - const( maskout( maskout( a, -'str.1' ), -'str.2' ), 0, -u )'
  name' = 'name' + value * const( maskout( maskout( 1, -'str.1' ), -'str.2' ), 0, -u )'

return



function qdims()
  'q dims'
  v = 1

  d = 2
  while( d <= 5 )
    line = sublin( result, d )
    stat = subwrd( line, 3 )

    if( stat = 'varying' )
      _gdim.v = subwrd( line, 1 )
      _wdim.v = subwrd( line, 4 )
      _wmin.v = subwrd( line, 6 )
      _wmax.v = subwrd( line, 8 )
      _gmin.v = subwrd( line, 11 )
      _gmax.v = subwrd( line, 13 )
      v = v + 1
    endif

    d = d + 1
  endwhile

return


function qdim( dim )
  'q dims'
  if( dim = 'X' ) ; line = sublin( result, 2 ) ; endif
  if( dim = 'Y' ) ; line = sublin( result, 3 ) ; endif
  if( dim = 'Z' ) ; line = sublin( result, 4 ) ; endif
  if( dim = 'T' ) ; line = sublin( result, 5 ) ; endif
return line



*
* help
*
function help()
  say ' Name:'
  say '   subst '_version' - substitute value at the specified position'
  say ' '
  say ' Usage:'
  say '   subst name value at grid1,grid2'
  say ''
  say '     name             : variable name'
  say '     value            : value to be set. field variable is supported.'
  say '     grid1,grid2      : grid position to be operated.'
  say '                        You can specifiy region using ":"'
  say '                        e.g. 10,20  10:30,20 50:75:10:25'
  say ''
  say ' Note:'
  say '   [arg-name]       : specify if needed'
  say '   (arg1 | arg2)    : arg1 or arg2 must be specified'
  say ''
  say ' Copyright (C) 2009 Chihiro Kodama'
  say ' Distributed under GNU GPL (http://www.gnu.org/licenses/gpl.html)'
  say ''
return
