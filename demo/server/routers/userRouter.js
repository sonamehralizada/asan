import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();

//asan login
router.post('/asanLogin', (req, res) => {
    const { pin, password } = req.body;
    const secretKey = process.env.JWT_SECRET || 'your-secure-secret-key'; 

    const userDataList = [
        { pin: '1UQBK7R', fullName: 'CƏFƏROV MÜQAVİL MƏHƏRRƏM OĞLU', password: 'Agro2020!!'},
        { pin: '874T34A', fullName: 'Hacı Qafar oğlu Musayev', password: 'Agro2020!!'},
        { pin: '0TRBSF7', fullName: 'ŞİRİNOV PAŞA ŞAHÜSEYN OĞLU', password: 'Agro2020!!'},
        { pin: 'NM4JN56', fullName: 'Varayev Firudin Idris oglu', password: 'Agro2020!!'},
        { pin: '0THTJPP', fullName: 'NİFTƏLİYEV ƏVƏZ ƏMİRAĞA OĞLU', password: 'Agro2020!!'},
        { pin: '4APJBHA', fullName: 'ABBASOV ŞƏMSİ SİMRAN OĞLU', password: 'Agro2020!!'},
        { pin: '11SF8G7', fullName: 'ALLAHVERDİYEV NAMİQ KAMİL OĞLU', password: 'Agro2020!!'},
        { pin: '1ZBWM48', fullName: 'RUSTAMOV SAHİB PAŞA OĞLU', password: 'Agro2020!!'},
        { pin: '3M9ERSE', fullName: 'QƏLƏNDƏROV FAİQ CƏLİL OĞLU', password: 'Agro2020!!'},
        { pin: '3NY6J1F', fullName: 'İBRAHİMOV SƏBUHİ RÜSTƏM OĞLU', password: 'Agro2020!!'},
        { pin: '59A4E1Q', fullName: 'CƏFƏROVA ZƏHRA TEYMUR QIZI', password: 'Agro2020!!'},
        { pin: '47L2YA9', fullName: 'MECDİNOV RAUF GƏNCALI OĞLU', password: 'Agro2020!!'},
        { pin: '4K3KB48', fullName: 'İSKƏNDƏROV TƏRLAN BABA OĞLU', password: 'Agro2020!!'},
        { pin: '4GJ6TZR', fullName: 'EYVAZOV AMİL MİRƏLİ OĞLU', password: 'Agro2020!!'},
        { pin: '1A0RL84', fullName: 'QƏHRƏMANOV ELVİN İSMAYIL OĞLU', password: 'Agro2020!!'},
        { pin: '5N5KTBS', fullName: 'MƏMMƏDOVA İRADƏ ABDULƏLİ QIZI', password: 'Agro2020!!'},
        { pin: '3SN4JHR', fullName: 'LƏTİFOV NAMİQ MANAF OĞLU', password: 'Agro2020!!'},
        { pin: '3CFJPAX', fullName: 'BABAYEV MƏMMƏDHÜSEYN DADAŞBALA OĞLU', password: 'Agro2020!!'},
        { pin: '41UPXWK', fullName: 'ALIYEV ƏLƏKBƏR HÜSEYNALI OĞLU', password: 'Agro2020!!'},
        { pin: '147ZXFS', fullName: 'AĞABƏYLİ MAHİR ARİF OĞLU', password: 'Agro2020!!'},
        { pin: '777UU77', fullName: 'Kərim Səlim oğlu Şeydayev', password: 'Agro2020!!'},
        { pin: '1M113FF', fullName: 'UKLEİNA YEKATERİNA VASİLYEVNA', password: 'Agro2020!!'},
        { pin: '61V936W', fullName: 'ALLAHVERDİYEV MÜSEYİB ƏLİ OĞLU', password: 'Agro2020!!'},
        { pin: '39LMLSX', fullName: 'İBRAHİMOV AKİF ƏMİR OĞLU', password: 'Agro2020!!'},
        { pin: '4FX5CPV', fullName: 'ABDULLAYEV ELÇİN MÖHLÜD OĞLU', password: 'Agro2020!!'},
        { pin: '0W66V7K', fullName: 'İSGƏNDƏROV RAHİL CƏBRAYIL OĞLU', password: 'Agro2020!!'},
        { pin: '34PQ0MY', fullName: 'XƏLİLOV RƏFAİL XİDİL OĞLU', password: 'Agro2020!!'},
        { pin: '3CKL41W', fullName: 'ƏLİYEV SABİR UMUD OĞLU', password: 'Agro2020!!'},
        { pin: '473EDZZ', fullName: 'CƏFƏROVA MƏHBUBƏ ƏZİZ QIZI', password: 'Agro2020!!'},
        { pin: '49GKMQ9', fullName: 'İBRAHİMOV XƏYYAM NURƏDDİN OĞLU', password: 'Agro2020!!'},
        { pin: '4G8EH1F', fullName: 'CAVADOV NATİQ EYVAZ OĞLU', password: 'Agro2020!!'},
        { pin: '47G5P0F', fullName: 'ƏRZİMANOV SƏRHƏD ƏRZİMAN OĞLU', password: 'Agro2020!!'},
        { pin: '131K5F7', fullName: 'MƏMMƏDOV RAHİB YASƏR OĞLU', password: 'Agro2020!!'},
        { pin: '2GJDD4Y', fullName: 'MUSTAFAYEV TALEH ŞAHNAZAR OĞLU', password: 'Agro2020!!'},
        { pin: '1VEUPSB', fullName: 'ABDULXALIQOV BƏXTİYAR CARULLA OĞLU', password: 'Agro2020!!'},
        { pin: '147ZTBE', fullName: 'AĞAYEVA RƏFİQƏ MƏHƏMMƏD QIZI', password: 'Agro2020!!'},
        { pin: '3ZQQ29Y', fullName: 'MƏMMƏDOV MƏZAHİR RZA OĞLU', password: 'Agro2020!!'},
        { pin: '227LMF4', fullName: 'YUSUBOV NAHİD MÜRSƏL OĞLU', password: 'Agro2020!!'},
        { pin: '3PW0DWT', fullName: 'HÜSEYNOV ASİF ADİL OĞLU', password: 'Agro2020!!'},
        { pin: '4C6D8ZD', fullName: 'PAŞAYEV RÖVŞƏN ÇAPAR OĞLU', password: 'Agro2020!!'},
        { pin: '2S656F3', fullName: 'MURADOV ƏKBƏR ƏDALƏT OĞLU', password: 'Agro2020!!'},
        { pin: '12UQCZ7', fullName: 'İBRAHİMOV VÜSAL NURƏDDİN OĞLU', password: 'Agro2020!!'},
        { pin: '31WS2P2', fullName: 'SOLTANOV AMİD AZAD OĞLU', password: 'Agro2020!!'},
        { pin: '5PQGVJ7', fullName: 'XƏLİLOV ƏLİ XƏLİL OĞLU', password: 'Agro2020!!'},
        { pin: '2F7FKGW', fullName: 'FƏRƏCOV DAVUD SOLTAN OĞLU', password: 'Agro2020!!'},
        { pin: '3D39F11', fullName: 'ABDURAHMANOV İKRAM ABDURAHMAN OĞLU', password: 'Agro2020!!'},
        { pin: '4PPF87M', fullName: 'QASIMOVA MƏNSURƏ SOLTAN QIZI', password: 'Agro2020!!'},
        { pin: '2M5HPGA', fullName: 'CAMİYEVA XANZADƏ ŞƏRİF QIZI', password: 'Agro2020!!'},
        { pin: '45HGH1H', fullName: 'HƏSƏNOV POLAD MUSAKİŞİ OĞLU', password: 'Agro2020!!'},
        { pin: '4NX20NZ', fullName: 'FƏRMAYILLI FƏRHAD BAYRAM OĞLU', password: 'Agro2020!!'},
        { pin: '1X3DJJ0', fullName: 'HÜSEYNOV RÖVŞƏN GÜLMƏMMƏD OĞLU', password: 'Agro2020!!'},
        { pin: '5H4HFGD', fullName: 'QANIYEV AYDIN AKBAR OĞLU', password: 'Agro2020!!'},
        { pin: '1LTRX5Y', fullName: 'ŞABANOV ELŞAD NOVRUZ OĞLU', password: 'Agro2020!!'},
        { pin: '3LGTQYA', fullName: 'VƏLİYEV TALEH AKİF OĞLU', password: 'Agro2020!!'},
        { pin: '4CQYK5H', fullName: 'KƏRİMOV İSMAYIL QASIM OĞLU', password: 'Agro2020!!'},
        { pin: '3NQGHCL', fullName: 'NAMAZLI RÖVŞƏN VƏLİ OĞLU', password: 'Agro2020!!'},
        { pin: '42A5ZCN', fullName: 'TAĞIYEV BABATAĞI MƏMMƏDTAĞI OĞLU', password: 'Agro2020!!'},
        { pin: '59NBYAK', fullName: 'MƏMMƏDOV RAHİB SOVQAT OĞLU', password: 'Agro2020!!'},
        { pin: '26JBUR9', fullName: 'MÖVLAYEV ELNUR ELMAN OĞLU', password: 'Agro2020!!'},
        { pin: '3HTMZZF', fullName: 'BOSTANOV RÖVŞƏN ƏBİLFƏT OĞLU', password: 'Agro2020!!'},
        { pin: '00XLPT0', fullName: 'VAHİDOV SÜBHAN HACAĞA OĞLU', password: 'Agro2020!!'},
        { pin: '11SBLEZ', fullName: 'QASIMOV RƏŞAD YUSİF OĞLU', password: 'Agro2020!!'},
        { pin: '4X4SX9L', fullName: 'MURADOVA DÜRDANƏ ADIGÖZƏL QIZI', password: 'Agro2020!!'},
        { pin: '3T6C0VG', fullName: 'CƏBİYEV NATİQ AĞAHÜSEYN OĞLU', password: 'Agro2020!!'},
        { pin: '16KMA6H', fullName: 'QURBANOV CAVANŞİR NƏSİR OĞLU', password: 'Agro2020!!'},
        { pin: '1NUB1TR', fullName: 'CƏFƏROV XƏTAİ TALIŞ OĞLU', password: 'Agro2020!!'},
        { pin: 'FINFINF', fullName: 'Bella Shukurova', password: 'Agro2020!!'},
        { pin: '1EHK6CD', fullName: 'ALBƏYOV ƏLƏKBƏR HÜMBƏT OĞLU', password: 'Agro2020!!'},
        { pin: '3272C1E', fullName: 'ƏLİMİRZƏYEVA QƏMƏR FİZULİ QIZI', password: 'Agro2020!!'},
        { pin: '66BAESV', fullName: 'NADİROVA YEGANƏ CAVANŞİR QIZI', password: 'Agro2020!!'},
        { pin: '3XZT5X7', fullName: 'ƏLİYEV ƏLƏKBƏR SURXAY OĞLU', password: 'Agro2020!!'},
        { pin: '3WQMFVX', fullName: 'ƏSGƏROV SÜBHAN FİDAİL OĞLU', password: 'Agro2020!!'},
        { pin: '4VZYKZH', fullName: 'TANIRVERDİYEV RƏŞAD DAĞLAR OĞLU', password: 'Agro2020!!'},
        { pin: '337SL5M', fullName: 'BƏŞİROV NAMİZƏD GÖYƏRÇİN OĞLU', password: 'Agro2020!!'},
        { pin: '3M7E7YU', fullName: 'YUSİBOV NİZAMİ BƏLQİYƏ OĞLU', password: 'Agro2020!!'},
        { pin: '232MUPA', fullName: 'İSRAFİLOV UĞUR SEYFULLA OĞLU', password: 'Agro2020!!'},
        { pin: '3JHLFJ9', fullName: 'MƏMMƏDOV MEHMAN TƏRLAN OĞLU', password: 'Agro2020!!'},
        { pin: '6CUK3LQ', fullName: 'MƏHƏBBƏTLİ ORXAN MÜŞFİQ OĞLU', password: 'Agro2020!!'},
        { pin: '45MSPB9', fullName: 'PAŞAYEVA ZEYNAB ƏLİQULU QIZI', password: 'Agro2020!!'},
        { pin: '3CY6FUU', fullName: 'HƏSƏNOV ELŞƏN İSRAFİL OĞLU', password: 'Agro2020!!'},
        { pin: '0UR8EYX', fullName: 'ALLAHVERDİYEV ANAR ŞAHMURAD OĞLU', password: 'Agro2020!!'},
        { pin: '5LT3Q0V', fullName: 'HƏSƏNOVA KAMİLƏ ÇOBAN QIZI', password: 'Agro2020!!'},
        { pin: '3DTQEBT', fullName: 'ABDULLAYEV VÜSAL XEYRULLA OĞLU', password: 'Agro2020!!'},
        { pin: '7G4NBFG', fullName: 'AHMADOV REMISH BABASH OĞLU', password: 'Agro2020!!'},
        { pin: '15RCK8N', fullName: 'MƏHƏRRƏMOV SƏDRƏDDİN SAYƏDDİN OĞLU', password: 'Agro2020!!'},
        { pin: '29JCBBA', fullName: 'RÜSTƏMOV ZEYNAL ZALI OĞLU', password: 'Agro2020!!'},
        { pin: '3Y8R4EQ', fullName: 'İSLAMOV İLQAR İSLAM OĞLU', password: 'Agro2020!!'},
        { pin: '3QL87GL', fullName: 'HƏSƏNOV SURƏDDİN İBRAHİM OĞLU', password: 'Agro2020!!'},
        { pin: '1WQHM7B', fullName: 'SEFİYEV DİNAR VALEH OĞLU', password: 'Agro2020!!'},
        { pin: '10Q5HH1', fullName: 'ZAMANOVA LEYLA ŞÜKÜR QIZI', password: 'Agro2020!!'},
        { pin: '44M3ZLZ', fullName: 'HƏSƏNOV AFTANDİL MƏMMƏD OĞLU', password: 'Agro2020!!'},
        { pin: '41T7REC', fullName: 'İSMAYILOV EMİN ABBASƏLİ OĞLU', password: 'Agro2020!!'},
        { pin: '3G6GB2N', fullName: 'ƏSƏDOV NURƏDDİN NƏSİR OĞLU', password: 'Agro2020!!'},
        { pin: '265YJYP', fullName: 'HACALIYEV TEYMUR QASIM OĞLU', password: 'Agro2020!!'},
        { pin: '38YPBK1', fullName: 'İBRAHİMOVA NƏCİBƏ HƏSƏN QIZI', password: 'Agro2020!!'},
        { pin: '3V1NNMM', fullName: 'ƏKBƏROVA TAHİRƏ ƏLİMƏRDAN QIZI', password: 'Agro2020!!'}
    ];

    const user = userDataList.find(userData => userData.pin === pin && userData.password === password);

    if (user) {
        const tokenPayload = {
            pin: user.pin,
            fullName: user.fullName
        };

        const tokenOptions = {
            expiresIn: '24h'  // 24 hours
        };

        const newSpecificToken = jwt.sign(tokenPayload, secretKey, tokenOptions);
        const decodedToken = jwt.decode(newSpecificToken);

        user.password = null
        res.json({
            status: 200,
            message: "Login successful",
            token: newSpecificToken,
            issuedAt: new Date(decodedToken.iat * 1000).toISOString(),
            expiresAt: new Date(decodedToken.exp * 1000).toISOString(),
            user: user
        });
        
    } else {
        res.status(401).json({
            status: 401,
            message: "not authorized"
        });
    }
});


router.post('/logoutAsan', (req, res) => {
    res.cookie('authToken', '', { expires: new Date(0) });
    res.json({ message: 'Logged out successfully. Cookie cleared.' });
});

export default router