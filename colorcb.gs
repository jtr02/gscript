function main(args)
** colorcb.gs
**
** example:
** 'colorcb 7 a'
** 'set clevs -3 -2 -1 1 2 3'
** 'd var'
**
** make color palette represented in ColorBrewer website (http://colorbrewer2.org/)
**
** Reference
** Brewer, Cynthia A., 2012. http://www.ColorBrewer.org, accessed 20 Feb 2012.
**
  if( args = '' )
    help()
    return
  endif
say 'args= 'args

  clevels = '7'
  cltype = 'a'
  clevels = subwrd( args, 1 )
  cltype = subwrd( args, 2 )

say 'clevels= 'clevels
say 'cltype= 'cltype

'set gxout shaded'

if(clevels='6')
'set clevs -2 -1 0 1 2'
if(cltype='a')
'set rgb 99 255 255 178'
'set rgb 98 254 217 118'
'set rgb 97 254 178 76'
'set rgb 96 253 141 60'
'set rgb 95 240 59 32'
'set rgb 94 189 0 38'
endif
if(cltype='b')
'set rgb 99 255 255 204'
'set rgb 98 199 233 180'
'set rgb 97 127 205 187'
'set rgb 96 65 182 196'
'set rgb 95 44 127 184'
'set rgb 94 37 52 148'
endif
if(cltype='c')
'set rgb 99 69 117 180'
'set rgb 98 145 191 219'
'set rgb 97 224 243 248'
'set rgb 96 254 224 144'
'set rgb 95 252 141 89'
'set rgb 94 215 48 39'
endif
if(cltype='d')
'set rgb 99 140 81 10'
'set rgb 98 216 179 101'
'set rgb 97 246 232 195'
'set rgb 96 245 245 245'
'set rgb 95 90 180 172'
'set rgb 94 1 102 94'
endif
if(cltype='e')
'set rgb 99 84 39 136'
'set rgb 98 153 142 195'
'set rgb 97 216 218 235'
'set rgb 96 254 224 182'
'set rgb 95 241 163 64'
'set rgb 94 230 97 1'
endif
if(cltype='f')
'set rgb 99 77 146 33'
'set rgb 98 161 215 106'
'set rgb 97 230 245 208'
'set rgb 96 253 224 239'
'set rgb 95 233 163 201'
'set rgb 94 197 27 125'
endif
'set ccols 99 98 97 96 95 94'
say 'set clevs = -2 -1 0 1 2'
endif

if(clevels='7')
'set clevs -3 -2 -1 1 2 3'
if(cltype='a')
'set rgb 99 255 255 178'
'set rgb 98 254 217 118'
'set rgb 97 254 178 76'
'set rgb 96 253 141 60'
'set rgb 95 252 78 42'
'set rgb 94 227 26 28'
'set rgb 93 177 0 38'
endif
if(cltype='b')
'set rgb 99 255 255 204'
'set rgb 98 199 233 180'
'set rgb 97 127 205 187'
'set rgb 96 65 182 196'
'set rgb 95 29 145 192'
'set rgb 94 34 94 168'
'set rgb 93 12 44 132'
endif
if(cltype='c')
'set rgb 99 69 117 180'
'set rgb 98 145 191 219'
'set rgb 97 224 243 248'
'set rgb 96 255 255 191'
'set rgb 95 254 224 144'
'set rgb 94 252 141 89'
'set rgb 93 215 48 39'
endif
if(cltype='d')
'set rgb 99 140 81 10'
'set rgb 98 216 179 101'
'set rgb 97 246 232 195'
'set rgb 96 245 245 245'
'set rgb 95 199 234 229'
'set rgb 94 90 180 172'
'set rgb 93 1 102 94'
endif
if(cltype='e')
'set rgb 99 84 39 136'
'set rgb 98 153 142 195'
'set rgb 97 216 218 235'
'set rgb 96 247 247 247'
'set rgb 95 254 224 182'
'set rgb 94 241 163 64'
'set rgb 93 230 97 1'
endif
if(cltype='f')
'set rgb 99 77 146 33'
'set rgb 98 161 215 106'
'set rgb 97 230 245 208'
'set rgb 96 247 247 247'
'set rgb 95 253 224 239'
'set rgb 94 233 163 201'
'set rgb 93 197 27 125'
endif
'set ccols 99 98 97 96 95 94 93'
say 'set clevs = -3 -2 -1 1 2 3'
endif

if(clevels='8')
'set clevs -3 -2 -1 0 1 2 3'
if(cltype='a')
'set rgb 99 255 255 204'
'set rgb 98 255 237 160'
'set rgb 97 254 217 118'
'set rgb 96 254 178 76'
'set rgb 95 253 141 60'
'set rgb 94 252 78 42'
'set rgb 93 227 26 28'
'set rgb 92 177 0 38'
endif
if(cltype='b')
'set rgb 99 255 255 217'
'set rgb 98 237 248 177'
'set rgb 97 199 233 180'
'set rgb 96 127 205 187'
'set rgb 95 65 182 196'
'set rgb 94 29 145 192'
'set rgb 93 34 94 168'
'set rgb 92 12 44 132'
endif
if(cltype='c')
'set rgb 99 69 117 180'
'set rgb 98 116 173 209'
'set rgb 97 171 217 233'
'set rgb 96 224 243 248'
'set rgb 95 254 224 144'
'set rgb 94 253 174 97'
'set rgb 93 244 109 67'
'set rgb 92 215 48 39'
endif
if(cltype='d')
'set rgb 99 140 81 10'
'set rgb 98 191 129 45'
'set rgb 97 223 129 125'
'set rgb 96 246 232 195'
'set rgb 95 199 234 229'
'set rgb 94 128 205 193'
'set rgb 93 53 151 143'
'set rgb 92 1 102 94'
endif
if(cltype='e')
'set rgb 99 84 39 136'
'set rgb 98 128 115 171'
'set rgb 97 178 171 210'
'set rgb 96 216 218 235'
'set rgb 95 254 224 182'
'set rgb 94 253 184 99'
'set rgb 93 224 130 20'
'set rgb 92 179 88 6'
endif
if(cltype='f')
'set rgb 99 197 27 125'
'set rgb 98 222 119 174'
'set rgb 97 241 182 218'
'set rgb 96 253 224 239'
'set rgb 95 230 245 208'
'set rgb 94 184 225 134'
'set rgb 93 127 188 65'
'set rgb 92 77 146 33'
endif
'set ccols 99 98 97 96 95 94 93 92'
say 'set clevs = -3 -2 -1 0 1 2 3'
endif

if(clevels='9')
'set clevs -4 -3 -2 -1 1 2 3 4'
if(cltype='a')
'set rgb 99 255 255 204'
'set rgb 98 255 237 160'
'set rgb 97 254 217 118'
'set rgb 96 254 178 76'
'set rgb 95 253 141 60'
'set rgb 94 252 78 42'
'set rgb 93 227 26 28'
'set rgb 92 189 0 38'
'set rgb 91 128 0 38'
endif
if(cltype='b')
'set rgb 99 255 255 217'
'set rgb 98 237 248 177'
'set rgb 97 199 233 180'
'set rgb 96 127 205 187'
'set rgb 95 65 182 196'
'set rgb 94 29 145 192'
'set rgb 93 34 94 168'
'set rgb 92 37 52 148'
'set rgb 91 8 29 88'
endif
if(cltype='c')
'set rgb 99 69 117 180'
'set rgb 98 116 173 209'
'set rgb 97 171 217 233'
'set rgb 96 224 243 248'
'set rgb 95 255 255 191'
'set rgb 94 254 224 144'
'set rgb 93 253 174 97'
'set rgb 92 244 109 67'
'set rgb 91 215 48 39'
endif
if(cltype='d')
'set rgb 99 141 81 10'
'set rgb 98 191 129 45'
'set rgb 97 223 194 125'
'set rgb 96 246 232 195'
'set rgb 95 245 245 245'
'set rgb 94 199 234 229'
'set rgb 93 128 205 193'
'set rgb 92 53 151 143'
'set rgb 91 1 102 94'
endif
if(cltype='e')
'set rgb 99 84 39 136'
'set rgb 98 128 115 171'
'set rgb 97 178 171 210'
'set rgb 96 216 218 235'
'set rgb 95 247 247 247'
'set rgb 94 254 224 182'
'set rgb 93 253 184 99'
'set rgb 92 224 130 20'
'set rgb 91 179 88 6'
endif
if(cltype='f')
'set rgb 99 77 146 33'
'set rgb 98 127 188 65'
'set rgb 97 184 225 134'
'set rgb 96 230 245 208'
'set rgb 95 247 247 247'
'set rgb 94 253 224 239'
'set rgb 93 241 182 218'
'set rgb 92 222 119 174'
'set rgb 91 197 27 125'
endif
'set ccols 99 98 97 96 95 94 93 92 91'
say 'set clevs = -4 -3 -2 -1 1 2 3 4'
endif

*******
* help
*
function help()
  say ' Name:'
  say '   colorcb - set "Cynthia Brewer colorpalette"'
  say '             written by Y.Kamae 12/02/21'
  say ' '
  say ' Usage:'
  say '   colorcb step type'
  say ''
  say ' Example:'
  say '   colorcb 7 a'
  say '   set clevs -3 -2 -1 1 2 3'
  say '   d var'
  say ''
  say '     step : steps of colorpalette (default=7)'
  say '     type : type of CB colorpalette (default=a)'
  say '            according to Fig. 4 in Kaye et al. (2012; GMD)'
  say ''
  say ' Note:'
  say '  You should set "clevs" after this sentence.'
  say ''

return
