const input = `*parik-
*ʕarqūb-
*ŝVry/w/ʕ-
*pVqVm-
*kat(a/i)p-
*z̄iqan-
*baṭn-
*nīb-, *nāb-
*gin(ā)z-at- {} *gin(ā)ʒ-at-
*gawp-
*kVbaw-(at-)
*ḥann-
*ʔirw/y-
*z̄Vrāʕ- {} *ǯVrāʕ-
*lat_aɣ- {} *lačaɣ-
*ṣVp(p)Vr-
*ʕVṣ̂ā/īṣ̂-
*ɣap(a)r-
*bahaq-
*ṣirnaɣ-at- {} *c̣irnaɣ-at-
*ɣa/ur-/*ɣarɣar-
*dāg-
*h_i(n)ṣVr- {} *h_i(n)c̣Vr-
*pawd-
*ʕidq-`

const rules = ` .*	-
[*()-]	-
ṭ	T
s	c
š	s
z	s`

const nullMarker = '-'

const initialValues = { input, rules, nullMarker }

export { initialValues }
