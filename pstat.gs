*
*  統計値をプリントする。有効数字は4桁。
*                                          2007 07/17   T.Egawa
*

function pstat (args)

  'query gxinfo'
  rec = sublin(result,1)
  gxout = subwrd(rec,4)

  'set gxout stat'
  'd 'args
  stat = result
  i=1
  rec = sublin(stat,i)
  dtype=subwrd(rec,4)
  if(dtype="station")
    stn=1
  else
    stn=0
  endif
  while(rec!="")
    if(subwrd(rec,5)="Valid" & subwrd(rec,6)="count")
      stat.0 = subwrd(rec,8)
    endif
    if(subwrd(rec,1)="Min,")
      stat.1 = subwrd(rec,4)
      stat.2 = subwrd(rec,5)
    endif
* Version 1.8 以前にはバグ
    if(subwrd(rec,1)="Stats[(sum,sumsqr,root(sumsqr))/n]:" | subwrd(rec,1)="Stats[(sum,sumsqr,root(sumsqr))/n)]:")
      stat.3 = subwrd(rec,2)
      stat.4 = subwrd(rec,4)
    endif
    if(subwrd(rec,1)="Stats[(sigma,var)(n-1)]:")
      stat.5 = subwrd(rec,2)
    endif
    i=i+1
    rec = sublin(stat,i)
  endwhile

  'query gxinfo'
  rec = sublin(result,3); xlo = subwrd(rec,4); xhi = subwrd(rec,6)
  rec = sublin(result,4); ylo = subwrd(rec,4); yhi = subwrd(rec,6)
  snam.0="Num"; snam.1="Min"; snam.2="Max"; snam.3="Ave"; snam.4="RMS"; snam.5="STD"
  i=1-stn
  while(i<=5)
    if(valnum(stat.i)=0)
      i=i+1
      continue
    endif
    deg=math_abs(stat.i)
    if(deg>0)
      deg=math_log10(deg)
* 有効数字はここで変える
      deg=3-math_int(deg)
    else
      deg=0
    endif
    stat.i=stat.i*math_pow(10,deg)
    stat.i=math_nint(stat.i)
    stat.i=stat.i/math_pow(10,deg)
    stsiz=0.018*(xhi-xlo)*(1-0.2*stn)
    'set string 1 bl'
    'set strsiz 'stsiz
    xpos=(xhi-xlo)/(5+stn)*(i-0.9+stn)+xlo
    ypos=(yhi-ylo)/100+yhi
    'draw string 'xpos' 'ypos' 'snam.i':'stat.i
    say snam.i':'stat.i
    i=i+1
  endwhile
  if(gxout="Contour" | gxout="Shaded" | gxout="Vector" | gxout="Grid" | gxout="Fgrid" | gxout="Line" | gxout="Bar" | gxout="Barb"  | gxout="Value" | gxout="GrFill" | gxout="LineFill")
    'set gxout 'gxout
  else;if(gxout="Wxsym")
    'set gxout stnmark'
  else
    'set gxout contour'
  endif;endif

return