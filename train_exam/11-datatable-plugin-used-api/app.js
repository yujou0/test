const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const userData = require( './data/data' ); 

app.use( express.static( __dirname ) );
app.use( bodyParser.json() );

const _port = process.env.PORT || 3000;
const _url = '/user/info';

// 指定開啟頁面
app.get( '/index.html', function ( req, res ) {
    res.sendFile( __dirname + "/" + "index.html" );
} )

// 取得全部資料
app.get( _url, function ( req, res ) {
    res.send( userData );
} )

// 取得單筆資料
app.get( _url + '/:id', function ( req, res ) {
    const id = req.params.id;
    let arr = [];

    userData.forEach( function ( obj, index ) {
        if ( obj.id === id ) {
            arr.push( userData[index] );
        }
    } );

    res.send( arr );
} )

// 新增資料
app.post( _url, function ( req, res ) {
    const newID = userData.length + 1;
    const newData = {
        id: newID,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: new Date().toISOString().slice( 0, 10 )
    };

    userData.push.apply( userData, [newData] );

    res.send( newData );
} );

// 修改單筆資料
app.put( _url + '/:id', function ( req, res ) {
    const id = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPhone = req.body.phone;
    const updateData = {
        id: id.toString(),
        name: newName,
        email: newEmail,
        phone: newPhone,
        date: new Date().toISOString().slice( 0, 10 )
    };

    userData.forEach( function ( obj, i ) {
        if ( obj.id === id ) {
            obj.name = newName;
            obj.email = newEmail;
            obj.phone = newPhone;
        }
    } );

    res.send( updateData );
} );

// 刪除單筆資料
app.delete( _url + '/:id', function ( req, res ) {
    const id = req.params.id;

    userData.forEach( function ( obj, i ) {
        if ( true && obj.id === id ) {
            userData.splice( i, 1 );
        }
    } );

    res.send( {
        id: id,
        data: userData
    } );
} );

app.listen( _port, function () {
    console.log( 'Example app listening on port 3000!' );
} );