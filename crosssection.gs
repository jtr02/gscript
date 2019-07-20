*********************************************************************
* The following lines will display an arbitrary X section
* from one specified point to another. 
*
* lon1 is the westernmost longitude point
* lon2 is the easternmost longitude point
* lat1 is the latitude that corresponds to lon1
* lat2 is the latitude that corresponds to lon2
*
* The loop is used to interpolate between points in
* the arbitrary cross section. This code will plot
* any cross section as long as you specify the points. 
* My code plots cross sections of PV after I calculated
* PV on 11 pressure surfaces. I have another script
* that plots cross sections of potential temperature, and
* the code is very similar to this, except theta is substituted
* for PV.
*
* Many thanks to Brian Doty at COLA for his help with this code.
*
********************************************************************

'set grads off'
'set zlog on'
'set x 1'
'set y 1'

prompt ' westernmost lonpoint ... ' ; pull lon1
prompt ' easternmost lon point ... ' ; pull lon2

prompt ' lat corresponds to western lon ... ' ; pull lat1
prompt ' lat corresponds to eastern lon ... ' ; pull lat2

prompt ' low-z ' ; pull z1
prompt ' upper-z ... ' ; pull z2

'set z 'z1' 'z2''

lon = lon1
'collect 1 free'
while (lon <= lon2)
  lat = lat1 + (lat2-lat1)*(lon-lon1) / (lon2-lon1)
  'collect 1 gr2stn(t,'lon','lat')'
  lon = lon + 1
endwhile

'set x 14 16'
'set xaxis 'lon1' 'lon2
'set clab on'

'd coll2gr(1,-u)'
'co'
'd coll2gr(1,-u)'

