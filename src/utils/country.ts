/* eslint-disable @typescript-eslint/no-unsafe-assignment, sort-keys */

import { PickerItemProps } from "@react-native-picker/picker";
import { FunctionComponent } from "react";
import { SvgProps } from "react-native-svg";

type ICountryCode = string;
interface ICountryInfo {
	name: string;
	flag: {
		default: FunctionComponent<SvgProps>;
	};
}

/**
 * Definice
 */
export type ICountryDefinition = Record<ICountryCode, ICountryInfo>;

/**
 * Polozky
 */
export type ICountryEntry = [code: ICountryCode, info: ICountryInfo];

/**
 * Staty
 */
export default class Country {
	/**
	 * Definice
	 */
	private static readonly definition: ICountryDefinition = {
		af: {
			flag: require("svg-country-flags/svg/af.svg"),
			name: "Afghánistán"
		},
		ax: {
			flag: require("svg-country-flags/svg/ax.svg"),
			name: "Ålandy"
		},
		al: {
			flag: require("svg-country-flags/svg/al.svg"),
			name: "Albánie"
		},
		dz: {
			flag: require("svg-country-flags/svg/dz.svg"),
			name: "Alžírsko"
		},
		as: {
			flag: require("svg-country-flags/svg/as.svg"),
			name: "Americká Samoa"
		},
		vi: {
			flag: require("svg-country-flags/svg/vi.svg"),
			name: "Americké Panenské ostrovy"
		},
		ad: {
			flag: require("svg-country-flags/svg/ad.svg"),
			name: "Andorra"
		},
		ao: {
			flag: require("svg-country-flags/svg/ao.svg"),
			name: "Angola"
		},
		ai: {
			flag: require("svg-country-flags/svg/ai.svg"),
			name: "Anguilla"
		},
		aq: {
			flag: require("svg-country-flags/svg/aq.svg"),
			name: "Antarktida"
		},
		ag: {
			flag: require("svg-country-flags/svg/ag.svg"),
			name: "Antigua a Barbuda"
		},
		ar: {
			flag: require("svg-country-flags/svg/ar.svg"),
			name: "Argentina"
		},
		am: {
			flag: require("svg-country-flags/svg/am.svg"),
			name: "Arménie"
		},
		aw: {
			flag: require("svg-country-flags/svg/aw.svg"),
			name: "Aruba"
		},
		au: {
			flag: require("svg-country-flags/svg/au.svg"),
			name: "Austrálie"
		},
		az: {
			flag: require("svg-country-flags/svg/az.svg"),
			name: "Ázerbájdžán"
		},
		bs: {
			flag: require("svg-country-flags/svg/bs.svg"),
			name: "Bahamy"
		},
		bh: {
			flag: require("svg-country-flags/svg/bh.svg"),
			name: "Bahrajn"
		},
		bd: {
			flag: require("svg-country-flags/svg/bd.svg"),
			name: "Bangladéš"
		},
		bb: {
			flag: require("svg-country-flags/svg/bb.svg"),
			name: "Barbados"
		},
		be: {
			flag: require("svg-country-flags/svg/be.svg"),
			name: "Belgie"
		},
		bz: {
			flag: require("svg-country-flags/svg/bz.svg"),
			name: "Belize"
		},
		by: {
			flag: require("svg-country-flags/svg/by.svg"),
			name: "Bělorusko"
		},
		bj: {
			flag: require("svg-country-flags/svg/bj.svg"),
			name: "Benin"
		},
		bm: {
			flag: require("svg-country-flags/svg/bm.svg"),
			name: "Bermudy"
		},
		bt: {
			flag: require("svg-country-flags/svg/bt.svg"),
			name: "Bhútán"
		},
		bo: {
			flag: require("svg-country-flags/svg/bo.svg"),
			name: "Bolívie"
		},
		bq: {
			flag: require("svg-country-flags/svg/bq.svg"),
			name: "Bonaire, Svatý Eustach a Saba"
		},
		ba: {
			flag: require("svg-country-flags/svg/ba.svg"),
			name: "Bosna a Hercegovina"
		},
		bw: {
			flag: require("svg-country-flags/svg/bw.svg"),
			name: "Botswana"
		},
		bv: {
			flag: require("svg-country-flags/svg/bv.svg"),
			name: "Bouvetův ostrov"
		},
		br: {
			flag: require("svg-country-flags/svg/br.svg"),
			name: "Brazílie"
		},
		io: {
			flag: require("svg-country-flags/svg/io.svg"),
			name: "Britské indickooceánské území"
		},
		vg: {
			flag: require("svg-country-flags/svg/vg.svg"),
			name: "Britské Panenské ostrovy"
		},
		bn: {
			flag: require("svg-country-flags/svg/bn.svg"),
			name: "Brunej"
		},
		bg: {
			flag: require("svg-country-flags/svg/bg.svg"),
			name: "Bulharsko"
		},
		bf: {
			flag: require("svg-country-flags/svg/bf.svg"),
			name: "Burkina Faso"
		},
		bi: {
			flag: require("svg-country-flags/svg/bi.svg"),
			name: "Burundi"
		},
		ck: {
			flag: require("svg-country-flags/svg/ck.svg"),
			name: "Cookovy ostrovy"
		},
		cw: {
			flag: require("svg-country-flags/svg/cw.svg"),
			name: "Curaçao"
		},
		td: {
			flag: require("svg-country-flags/svg/td.svg"),
			name: "Čad"
		},
		me: {
			flag: require("svg-country-flags/svg/me.svg"),
			name: "Černá Hora"
		},
		cz: {
			flag: require("svg-country-flags/svg/cz.svg"),
			name: "Česko"
		},
		cn: {
			flag: require("svg-country-flags/svg/cn.svg"),
			name: "Čína"
		},
		dk: {
			flag: require("svg-country-flags/svg/dk.svg"),
			name: "Dánsko"
		},
		cd: {
			flag: require("svg-country-flags/svg/cd.svg"),
			name: "Demokratická republika Kongo"
		},
		dm: {
			flag: require("svg-country-flags/svg/dm.svg"),
			name: "Dominika"
		},
		do: {
			flag: require("svg-country-flags/svg/do.svg"),
			name: "Dominikánská republika"
		},
		dj: {
			flag: require("svg-country-flags/svg/dj.svg"),
			name: "Džibutsko"
		},
		eg: {
			flag: require("svg-country-flags/svg/eg.svg"),
			name: "Egypt"
		},
		ec: {
			flag: require("svg-country-flags/svg/ec.svg"),
			name: "Ekvádor"
		},
		er: {
			flag: require("svg-country-flags/svg/er.svg"),
			name: "Eritrea"
		},
		ee: {
			flag: require("svg-country-flags/svg/ee.svg"),
			name: "Estonsko"
		},
		et: {
			flag: require("svg-country-flags/svg/et.svg"),
			name: "Etiopie"
		},
		fo: {
			flag: require("svg-country-flags/svg/fo.svg"),
			name: "Faerské ostrovy"
		},
		fk: {
			flag: require("svg-country-flags/svg/fk.svg"),
			name: "Falklandy (Malvíny)"
		},
		fj: {
			flag: require("svg-country-flags/svg/fj.svg"),
			name: "Fidži"
		},
		ph: {
			flag: require("svg-country-flags/svg/ph.svg"),
			name: "Filipíny"
		},
		fi: {
			flag: require("svg-country-flags/svg/fi.svg"),
			name: "Finsko"
		},
		fr: {
			flag: require("svg-country-flags/svg/fr.svg"),
			name: "Francie"
		},
		gf: {
			flag: require("svg-country-flags/svg/gf.svg"),
			name: "Francouzská Guyana"
		},
		tf: {
			flag: require("svg-country-flags/svg/tf.svg"),
			name: "Francouzská jižní a antarktická území"
		},
		pf: {
			flag: require("svg-country-flags/svg/pf.svg"),
			name: "Francouzská Polynésie"
		},
		ga: {
			flag: require("svg-country-flags/svg/ga.svg"),
			name: "Gabon"
		},
		gm: {
			flag: require("svg-country-flags/svg/gm.svg"),
			name: "Gambie"
		},
		gh: {
			flag: require("svg-country-flags/svg/gh.svg"),
			name: "Ghana"
		},
		gi: {
			flag: require("svg-country-flags/svg/gi.svg"),
			name: "Gibraltar"
		},
		gd: {
			flag: require("svg-country-flags/svg/gd.svg"),
			name: "Grenada"
		},
		gl: {
			flag: require("svg-country-flags/svg/gl.svg"),
			name: "Grónsko"
		},
		ge: {
			flag: require("svg-country-flags/svg/ge.svg"),
			name: "Gruzie"
		},
		gp: {
			flag: require("svg-country-flags/svg/gp.svg"),
			name: "Guadeloupe"
		},
		gu: {
			flag: require("svg-country-flags/svg/gu.svg"),
			name: "Guam"
		},
		gt: {
			flag: require("svg-country-flags/svg/gt.svg"),
			name: "Guatemala"
		},
		gn: {
			flag: require("svg-country-flags/svg/gn.svg"),
			name: "Guinea"
		},
		gw: {
			flag: require("svg-country-flags/svg/gw.svg"),
			name: "Guinea-Bissau"
		},
		gg: {
			flag: require("svg-country-flags/svg/gg.svg"),
			name: "Guernsey"
		},
		gy: {
			flag: require("svg-country-flags/svg/gy.svg"),
			name: "Guyana"
		},
		ht: {
			flag: require("svg-country-flags/svg/ht.svg"),
			name: "Haiti"
		},
		hm: {
			flag: require("svg-country-flags/svg/hm.svg"),
			name: "Heardův ostrov a McDonaldovy ostrovy"
		},
		hn: {
			flag: require("svg-country-flags/svg/hn.svg"),
			name: "Honduras"
		},
		hk: {
			flag: require("svg-country-flags/svg/hk.svg"),
			name: "Hongkong"
		},
		cl: {
			flag: require("svg-country-flags/svg/cl.svg"),
			name: "Chile"
		},
		hr: {
			flag: require("svg-country-flags/svg/hr.svg"),
			name: "Chorvatsko"
		},
		in: {
			flag: require("svg-country-flags/svg/in.svg"),
			name: "Indie"
		},
		id: {
			flag: require("svg-country-flags/svg/id.svg"),
			name: "Indonésie"
		},
		iq: {
			flag: require("svg-country-flags/svg/iq.svg"),
			name: "Irák"
		},
		ir: {
			flag: require("svg-country-flags/svg/ir.svg"),
			name: "Írán"
		},
		ie: {
			flag: require("svg-country-flags/svg/ie.svg"),
			name: "Irsko"
		},
		is: {
			flag: require("svg-country-flags/svg/is.svg"),
			name: "Island"
		},
		it: {
			flag: require("svg-country-flags/svg/it.svg"),
			name: "Itálie"
		},
		il: {
			flag: require("svg-country-flags/svg/il.svg"),
			name: "Izrael"
		},
		jm: {
			flag: require("svg-country-flags/svg/jm.svg"),
			name: "Jamajka"
		},
		jp: {
			flag: require("svg-country-flags/svg/jp.svg"),
			name: "Japonsko"
		},
		ye: {
			flag: require("svg-country-flags/svg/ye.svg"),
			name: "Jemen"
		},
		je: {
			flag: require("svg-country-flags/svg/je.svg"),
			name: "Jersey"
		},
		za: {
			flag: require("svg-country-flags/svg/za.svg"),
			name: "Jihoafrická republika"
		},
		gs: {
			flag: require("svg-country-flags/svg/gs.svg"),
			name: "Jižní Georgie a Jižní Sandwichovy ostrovy"
		},
		kr: {
			flag: require("svg-country-flags/svg/kr.svg"),
			name: "Jižní Korea"
		},
		ss: {
			flag: require("svg-country-flags/svg/ss.svg"),
			name: "Jižní Súdán"
		},
		jo: {
			flag: require("svg-country-flags/svg/jo.svg"),
			name: "Jordánsko"
		},
		ky: {
			flag: require("svg-country-flags/svg/ky.svg"),
			name: "Kajmanské ostrovy"
		},
		kh: {
			flag: require("svg-country-flags/svg/kh.svg"),
			name: "Kambodža"
		},
		cm: {
			flag: require("svg-country-flags/svg/cm.svg"),
			name: "Kamerun"
		},
		ca: {
			flag: require("svg-country-flags/svg/ca.svg"),
			name: "Kanada"
		},
		cv: {
			flag: require("svg-country-flags/svg/cv.svg"),
			name: "Kapverdy"
		},
		qa: {
			flag: require("svg-country-flags/svg/qa.svg"),
			name: "Katar"
		},
		kz: {
			flag: require("svg-country-flags/svg/kz.svg"),
			name: "Kazachstán"
		},
		ke: {
			flag: require("svg-country-flags/svg/ke.svg"),
			name: "Keňa"
		},
		ki: {
			flag: require("svg-country-flags/svg/ki.svg"),
			name: "Kiribati"
		},
		cc: {
			flag: require("svg-country-flags/svg/cc.svg"),
			name: "Kokosové ostrovy"
		},
		co: {
			flag: require("svg-country-flags/svg/co.svg"),
			name: "Kolumbie"
		},
		km: {
			flag: require("svg-country-flags/svg/km.svg"),
			name: "Komory"
		},
		cg: {
			flag: require("svg-country-flags/svg/cg.svg"),
			name: "Kongo"
		},
		cr: {
			flag: require("svg-country-flags/svg/cr.svg"),
			name: "Kostarika"
		},
		cu: {
			flag: require("svg-country-flags/svg/cu.svg"),
			name: "Kuba"
		},
		kw: {
			flag: require("svg-country-flags/svg/kw.svg"),
			name: "Kuvajt"
		},
		cy: {
			flag: require("svg-country-flags/svg/cy.svg"),
			name: "Kypr"
		},
		kg: {
			flag: require("svg-country-flags/svg/kg.svg"),
			name: "Kyrgyzstán"
		},
		la: {
			flag: require("svg-country-flags/svg/la.svg"),
			name: "Laos"
		},
		ls: {
			flag: require("svg-country-flags/svg/ls.svg"),
			name: "Lesotho"
		},
		lb: {
			flag: require("svg-country-flags/svg/lb.svg"),
			name: "Libanon"
		},
		lr: {
			flag: require("svg-country-flags/svg/lr.svg"),
			name: "Libérie"
		},
		ly: {
			flag: require("svg-country-flags/svg/ly.svg"),
			name: "Libye"
		},
		li: {
			flag: require("svg-country-flags/svg/li.svg"),
			name: "Lichtenštejnsko"
		},
		lt: {
			flag: require("svg-country-flags/svg/lt.svg"),
			name: "Litva"
		},
		lv: {
			flag: require("svg-country-flags/svg/lv.svg"),
			name: "Lotyšsko"
		},
		lu: {
			flag: require("svg-country-flags/svg/lu.svg"),
			name: "Lucembursko"
		},
		mo: {
			flag: require("svg-country-flags/svg/mo.svg"),
			name: "Macao"
		},
		mg: {
			flag: require("svg-country-flags/svg/mg.svg"),
			name: "Madagaskar"
		},
		hu: {
			flag: require("svg-country-flags/svg/hu.svg"),
			name: "Maďarsko"
		},
		mk: {
			flag: require("svg-country-flags/svg/mk.svg"),
			name: "Makedonie"
		},
		my: {
			flag: require("svg-country-flags/svg/my.svg"),
			name: "Malajsie"
		},
		mw: {
			flag: require("svg-country-flags/svg/mw.svg"),
			name: "Malawi"
		},
		mv: {
			flag: require("svg-country-flags/svg/mv.svg"),
			name: "Maledivy"
		},
		ml: {
			flag: require("svg-country-flags/svg/ml.svg"),
			name: "Mali"
		},
		mt: {
			flag: require("svg-country-flags/svg/mt.svg"),
			name: "Malta"
		},
		im: {
			flag: require("svg-country-flags/svg/im.svg"),
			name: "Ostrov Man"
		},
		ma: {
			flag: require("svg-country-flags/svg/ma.svg"),
			name: "Maroko"
		},
		mh: {
			flag: require("svg-country-flags/svg/mh.svg"),
			name: "Marshallovy ostrovy"
		},
		mq: {
			flag: require("svg-country-flags/svg/mq.svg"),
			name: "Martinik"
		},
		mu: {
			flag: require("svg-country-flags/svg/mu.svg"),
			name: "Mauricius"
		},
		mr: {
			flag: require("svg-country-flags/svg/mr.svg"),
			name: "Mauritánie"
		},
		yt: {
			flag: require("svg-country-flags/svg/yt.svg"),
			name: "Mayotte"
		},
		um: {
			flag: require("svg-country-flags/svg/um.svg"),
			name: "Menší odlehlé ostrovy USA"
		},
		mx: {
			flag: require("svg-country-flags/svg/mx.svg"),
			name: "Mexiko"
		},
		fm: {
			flag: require("svg-country-flags/svg/fm.svg"),
			name: "Mikronésie"
		},
		md: {
			flag: require("svg-country-flags/svg/md.svg"),
			name: "Moldavsko"
		},
		mc: {
			flag: require("svg-country-flags/svg/mc.svg"),
			name: "Monako"
		},
		mn: {
			flag: require("svg-country-flags/svg/mn.svg"),
			name: "Mongolsko"
		},
		ms: {
			flag: require("svg-country-flags/svg/ms.svg"),
			name: "Montserrat"
		},
		mz: {
			flag: require("svg-country-flags/svg/mz.svg"),
			name: "Mosambik"
		},
		mm: {
			flag: require("svg-country-flags/svg/mm.svg"),
			name: "Myanmar"
		},
		na: {
			flag: require("svg-country-flags/svg/na.svg"),
			name: "Namibie"
		},
		nr: {
			flag: require("svg-country-flags/svg/nr.svg"),
			name: "Nauru"
		},
		de: {
			flag: require("svg-country-flags/svg/de.svg"),
			name: "Německo"
		},
		np: {
			flag: require("svg-country-flags/svg/np.svg"),
			name: "Nepál"
		},
		ne: {
			flag: require("svg-country-flags/svg/ne.svg"),
			name: "Niger"
		},
		ng: {
			flag: require("svg-country-flags/svg/ng.svg"),
			name: "Nigérie"
		},
		ni: {
			flag: require("svg-country-flags/svg/ni.svg"),
			name: "Nikaragua"
		},
		nu: {
			flag: require("svg-country-flags/svg/nu.svg"),
			name: "Niue"
		},
		nl: {
			flag: require("svg-country-flags/svg/nl.svg"),
			name: "Nizozemsko"
		},
		nf: {
			flag: require("svg-country-flags/svg/nf.svg"),
			name: "Norfolk"
		},
		no: {
			flag: require("svg-country-flags/svg/no.svg"),
			name: "Norsko"
		},
		nc: {
			flag: require("svg-country-flags/svg/nc.svg"),
			name: "Nová Kaledonie"
		},
		nz: {
			flag: require("svg-country-flags/svg/nz.svg"),
			name: "Nový Zéland"
		},
		om: {
			flag: require("svg-country-flags/svg/om.svg"),
			name: "Omán"
		},
		pk: {
			flag: require("svg-country-flags/svg/pk.svg"),
			name: "Pákistán"
		},
		pw: {
			flag: require("svg-country-flags/svg/pw.svg"),
			name: "Palau"
		},
		ps: {
			flag: require("svg-country-flags/svg/ps.svg"),
			name: "Palestinská autonomie"
		},
		pa: {
			flag: require("svg-country-flags/svg/pa.svg"),
			name: "Panama"
		},
		pg: {
			flag: require("svg-country-flags/svg/pg.svg"),
			name: "Papua-Nová Guinea"
		},
		py: {
			flag: require("svg-country-flags/svg/py.svg"),
			name: "Paraguay"
		},
		pe: {
			flag: require("svg-country-flags/svg/pe.svg"),
			name: "Peru"
		},
		pn: {
			flag: require("svg-country-flags/svg/pn.svg"),
			name: "Pitcairnovy ostrovy"
		},
		ci: {
			flag: require("svg-country-flags/svg/ci.svg"),
			name: "Pobřeží slonoviny"
		},
		pl: {
			flag: require("svg-country-flags/svg/pl.svg"),
			name: "Polsko"
		},
		pr: {
			flag: require("svg-country-flags/svg/pr.svg"),
			name: "Portoriko"
		},
		pt: {
			flag: require("svg-country-flags/svg/pt.svg"),
			name: "Portugalsko"
		},
		at: {
			flag: require("svg-country-flags/svg/at.svg"),
			name: "Rakousko"
		},
		re: {
			flag: require("svg-country-flags/svg/re.svg"),
			name: "Réunion"
		},
		gq: {
			flag: require("svg-country-flags/svg/gq.svg"),
			name: "Rovníková Guinea"
		},
		ro: {
			flag: require("svg-country-flags/svg/ro.svg"),
			name: "Rumunsko"
		},
		ru: {
			flag: require("svg-country-flags/svg/ru.svg"),
			name: "Rusko"
		},
		rw: {
			flag: require("svg-country-flags/svg/rw.svg"),
			name: "Rwanda"
		},
		gr: {
			flag: require("svg-country-flags/svg/gr.svg"),
			name: "Řecko"
		},
		pm: {
			flag: require("svg-country-flags/svg/pm.svg"),
			name: "Saint-Pierre a Miquelon"
		},
		sv: {
			flag: require("svg-country-flags/svg/sv.svg"),
			name: "Salvador"
		},
		ws: {
			flag: require("svg-country-flags/svg/ws.svg"),
			name: "Samoa"
		},
		sm: {
			flag: require("svg-country-flags/svg/sm.svg"),
			name: "San Marino"
		},
		sa: {
			flag: require("svg-country-flags/svg/sa.svg"),
			name: "Saúdská Arábie"
		},
		sn: {
			flag: require("svg-country-flags/svg/sn.svg"),
			name: "Senegal"
		},
		kp: {
			flag: require("svg-country-flags/svg/kp.svg"),
			name: "Severní Korea"
		},
		mp: {
			flag: require("svg-country-flags/svg/mp.svg"),
			name: "Severní Mariany"
		},
		sc: {
			flag: require("svg-country-flags/svg/sc.svg"),
			name: "Seychely"
		},
		sl: {
			flag: require("svg-country-flags/svg/sl.svg"),
			name: "Sierra Leone"
		},
		sg: {
			flag: require("svg-country-flags/svg/sg.svg"),
			name: "Singapur"
		},
		sk: {
			flag: require("svg-country-flags/svg/sk.svg"),
			name: "Slovensko"
		},
		si: {
			flag: require("svg-country-flags/svg/si.svg"),
			name: "Slovinsko"
		},
		so: {
			flag: require("svg-country-flags/svg/so.svg"),
			name: "Somálsko"
		},
		ae: {
			flag: require("svg-country-flags/svg/ae.svg"),
			name: "Spojené arabské emiráty"
		},
		gb: {
			flag: require("svg-country-flags/svg/gb.svg"),
			name: "Spojené království Velké Británie a Severního Irska"
		},
		us: {
			flag: require("svg-country-flags/svg/us.svg"),
			name: "Spojené státy americké"
		},
		rs: {
			flag: require("svg-country-flags/svg/rs.svg"),
			name: "Srbsko"
		},
		lk: {
			flag: require("svg-country-flags/svg/lk.svg"),
			name: "Srí Lanka"
		},
		cf: {
			flag: require("svg-country-flags/svg/cf.svg"),
			name: "Středoafrická republika"
		},
		sd: {
			flag: require("svg-country-flags/svg/sd.svg"),
			name: "Súdán"
		},
		sr: {
			flag: require("svg-country-flags/svg/sr.svg"),
			name: "Surinam"
		},
		sh: {
			flag: require("svg-country-flags/svg/sh.svg"),
			name: "Svatá Helena, Ascension a Tristan da Cunha"
		},
		lc: {
			flag: require("svg-country-flags/svg/lc.svg"),
			name: "Svatá Lucie"
		},
		bl: {
			flag: require("svg-country-flags/svg/bl.svg"),
			name: "Svatý Bartoloměj"
		},
		kn: {
			flag: require("svg-country-flags/svg/kn.svg"),
			name: "Svatý Kryštof a Nevis"
		},
		mf: {
			flag: require("svg-country-flags/svg/mf.svg"),
			name: "Svatý Martin (francouzská část)"
		},
		sx: {
			flag: require("svg-country-flags/svg/sx.svg"),
			name: "Svatý Martin (nizozemská část)"
		},
		st: {
			flag: require("svg-country-flags/svg/st.svg"),
			name: "Svatý Tomáš a Princův ostrov"
		},
		vc: {
			flag: require("svg-country-flags/svg/vc.svg"),
			name: "Svatý Vincenc a Grenadiny"
		},
		sz: {
			flag: require("svg-country-flags/svg/sz.svg"),
			name: "Svazijsko"
		},
		sy: {
			flag: require("svg-country-flags/svg/sy.svg"),
			name: "Sýrie"
		},
		sb: {
			flag: require("svg-country-flags/svg/sb.svg"),
			name: "Šalomounovy ostrovy"
		},
		es: {
			flag: require("svg-country-flags/svg/es.svg"),
			name: "Španělsko"
		},
		sj: {
			flag: require("svg-country-flags/svg/sj.svg"),
			name: "Špicberky a Jan Mayen"
		},
		se: {
			flag: require("svg-country-flags/svg/se.svg"),
			name: "Švédsko"
		},
		ch: {
			flag: require("svg-country-flags/svg/ch.svg"),
			name: "Švýcarsko"
		},
		tj: {
			flag: require("svg-country-flags/svg/tj.svg"),
			name: "Tádžikistán"
		},
		tz: {
			flag: require("svg-country-flags/svg/tz.svg"),
			name: "Tanzanie"
		},
		th: {
			flag: require("svg-country-flags/svg/th.svg"),
			name: "Thajsko"
		},
		tw: {
			flag: require("svg-country-flags/svg/tw.svg"),
			name: "Tchaj-wan"
		},
		tg: {
			flag: require("svg-country-flags/svg/tg.svg"),
			name: "Togo"
		},
		tk: {
			flag: require("svg-country-flags/svg/tk.svg"),
			name: "Tokelau"
		},
		to: {
			flag: require("svg-country-flags/svg/to.svg"),
			name: "Tonga"
		},
		tt: {
			flag: require("svg-country-flags/svg/tt.svg"),
			name: "Trinidad a Tobago"
		},
		tn: {
			flag: require("svg-country-flags/svg/tn.svg"),
			name: "Tunisko"
		},
		tr: {
			flag: require("svg-country-flags/svg/tr.svg"),
			name: "Turecko"
		},
		tm: {
			flag: require("svg-country-flags/svg/tm.svg"),
			name: "Turkmenistán"
		},
		tc: {
			flag: require("svg-country-flags/svg/tc.svg"),
			name: "Turks a Caicos"
		},
		tv: {
			flag: require("svg-country-flags/svg/tv.svg"),
			name: "Tuvalu"
		},
		ug: {
			flag: require("svg-country-flags/svg/ug.svg"),
			name: "Uganda"
		},
		ua: {
			flag: require("svg-country-flags/svg/ua.svg"),
			name: "Ukrajina"
		},
		uy: {
			flag: require("svg-country-flags/svg/uy.svg"),
			name: "Uruguay"
		},
		uz: {
			flag: require("svg-country-flags/svg/uz.svg"),
			name: "Uzbekistán"
		},
		cx: {
			flag: require("svg-country-flags/svg/cx.svg"),
			name: "Vánoční ostrov"
		},
		vu: {
			flag: require("svg-country-flags/svg/vu.svg"),
			name: "Vanuatu"
		},
		va: {
			flag: require("svg-country-flags/svg/va.svg"),
			name: "Vatikán"
		},
		ve: {
			flag: require("svg-country-flags/svg/ve.svg"),
			name: "Venezuela"
		},
		vn: {
			flag: require("svg-country-flags/svg/vn.svg"),
			name: "Vietnam"
		},
		tl: {
			flag: require("svg-country-flags/svg/tl.svg"),
			name: "Východní Timor"
		},
		wf: {
			flag: require("svg-country-flags/svg/wf.svg"),
			name: "Wallis a Futuna"
		},
		zm: {
			flag: require("svg-country-flags/svg/zm.svg"),
			name: "Zambie"
		},
		eh: {
			flag: require("svg-country-flags/svg/eh.svg"),
			name: "Západní Sahara"
		},
		zw: {
			flag: require("svg-country-flags/svg/zw.svg"),
			name: "Zimbabwe"
		}
	};

	/**
	 * Ziskani pole polozek
	 *
	 * @returns {ICountryEntry[]} Polozky
	 */
	public static entries(): ICountryEntry[] {
		return Object.entries(this.definition);
	}

	/**
	 * Pripravapro vyberova menu
	 *
	 * @returns {PickerItemProps[]} Polozky
	 */
	public static picker(): PickerItemProps[] {
		return this.entries().map((entry) => ({
			label: entry[1].name,
			value: entry[0]
		}));
	}
}
