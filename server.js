const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 5000;
const cors = require('cors'); // Importe o módulo CORS
// Permitir requisições do mesmo servidor web
app.use(cors());
app.get('/dados-do-banco', async (req, res) => {
    const sq2 = `
    SELECT 
        bg.cliente AS NOME,
        v.PLACA AS placa,
        e.CODIGO_PRODUTO AS codigo_produto,
        v.SEGURADORA AS seguradora,
        rf.id_hospedeiro AS ID_HOSPEDEIRO,
        rf.contador AS contador,
        DATE_FORMAT(rf.jammer_date, '%d-%m-%Y %H:%i:%s') AS jammer_date,
        nexsat.distanciaPontosGPS('-23.55088', '-46.633055', pl.LATITUDE, pl.LONGITUDE) AS distancia_SP,
        pl.ID AS ID,
        pl.CODIGO AS CODIGO,
        pl.DATA_HORA_REC AS DATA_HORA_REC,
        pl.DATA_HORA_GPS AS DATA_HORA_GPS,
        pl.DATA_REC AS DATA_REC,
        pl.DH_GPS AS DH_GPS,
        pl.LATITUDE AS LATITUDE,
        pl.LONGITUDE AS LONGITUDE,
        pl.ANGULO AS ANGULO,
        pl.QTDADE_SATELITE AS QTDADE_SATELITE,
        pl.SINAL AS SINAL,
        pl.TENSAO AS TENSAO,
        pl.TEMP AS TEMP,
        pl.VELOCIDADE AS VELOCIDADE,
        pl.ODOMETRO AS ODOMETRO,
        pl.HORIMETRO AS HORIMETRO,
        pl.RPM AS RPM,
        pl.HDOP AS HDOP,
        pl.PT_ID AS PT_ID,
        pl.AUX1 AS AUX1,
        pl.AUX2 AS AUX2,
        pl.AUX3 AS AUX3,
        pl.AUX4 AS AUX4,
        pl.AUX5 AS AUX5,
        pl.AUX6 AS AUX6,
        pl.AUX7 AS AUX7,
        pl.AUX8 AS AUX8,
        pl.SAI_1 AS SAI_1,
        pl.SAI_2 AS SAI_2,
        pl.SAI_3 AS SAI_3,
        pl.SAI_4 AS SAI_4,
        pl.SAI_5 AS SAI_5,
        pl.SAI_6 AS SAI_6,
        pl.SAI_7 AS SAI_7,
        pl.SAI_8 AS SAI_8,
        pl.PANICO1 AS PANICO1,
        pl.PANICO2 AS PANICO2,
        pl.CHAVE AS CHAVE,
        pl.ATUALIZADO AS ATUALIZADO,
        pl.BATERIA AS BATERIA,
        pl.GPS AS GPS,
        pl.V4ANTOPEN AS V4ANTOPEN,
        pl.V4ANTSHORT AS V4ANTSHORT,
        pl.BATTERYPRESENT AS BATTERYPRESENT,
        pl.VEL_EXCESS AS VEL_EXCESS,
        pl.ENDERECO AS ENDERECO,
        v.CHASSIS AS CHASSIS,
        v.MARCA AS MARCA,
        v.MODELO AS MODELO
    FROM
        nexsat.jammer_state rf
        JOIN nexsat.posicoeslidas_comp pl ON pl.ID = rf.id
        JOIN telemil.dispositivos e ON e.IME = rf.id AND e.chassis IS NOT NULL
        JOIN telemil.veiculos v ON e.chassis = v.CHASSIS
        JOIN telemil.base_geral bg ON bg.chassis = v.CHASSIS
    WHERE
        rf.status = 1
    GROUP BY
        rf.id
    ORDER BY
        distancia_SP, rf.contador DESC
    LIMIT 100;
    `;
    
    try {
        const conexao = await mysql.createConnection({
          host: '10.20.1.30',
          user: 'SYSDBA',
          password: 'masterkey',
          database: 'nexsat', // Substitua pelo nome do seu banco de dados
          charset: 'utf8mb4',
          namedPlaceholders: true,
        });
    
        const [rows, fields] = await conexao.execute(sq2);
        await conexao.end();
    
        res.json({ dados: rows });
    } catch (error) {
        console.error('Erro SQL:', error);
        res.status(500).json({ erro: 'Erro ao obter dados do banco de dados' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
