/**
 * Test: POST /api/auth/login
 */
 testUtils.createTestButton("Test Login Correcto (Pepe y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.ok) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Password Incorrecto (Pepe y 123)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status == 401) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Usuario Incorrecto (Juan y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status == 401) {
        testUtils.setSuccess(btn);
    }
});



testUtils.createTestButton("Test Registro Correcto (Jorge y 2974)", async (btn) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'Jorge' + Date.now() , password: '2974' }) // Usamos Jorge hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status == 201) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test seguridad - Productor accediendo a admin", async(btn) => {
    const response = await fetch('/api/auth/login',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({username: 'pepe' ,password: '12345'})
    });
    const loginData = await response.json();
    const token = loginData.token;

    const AdminResponse = await fetch('/api/admin/users',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token 
        }
    });

    if (AdminResponse.status == 403){
        testUtils.setSuccess(btn);
    }

});

testUtils.createTestButton("Test Eliminar Sample Dinámico", async(btn) =>{
    const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({username: 'pepe', password: '12345'})
    });
    const loginData = await loginResponse.json();
    const token = loginData.token;

    const listResponse = await fetch('/api/samples/my-samples',{
        method: 'GET',
        headers: {'Authorization': 'Bearer '+ token}
    });

    const samples = await listResponse.json();

    if (samples.length === 0){
        testUtils.log("No hay samples, subi uno primero")
    }else{
        const targetId = samples[0].id;
        testUtils.log("Borrando sample con id: " + targetId);

        const deleteResponse = await fetch('/api/samples/' + targetId,{
            method: 'DELETE',
            headers: {'Authorization' : 'Bearer ' + token}    
        });

        if(deleteResponse.ok){
            testUtils.setSuccess(btn);
        }
    }

});

testUtils.createTestButton("Test Subir Sample - Error por Datos Faltantes" , async(btn) => {
    const loginResponse = await fetch('/api/auth/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: 'pepe', password : '12345'})
    });

    const loginData = await loginResponse.json();
    const token = loginData.token;

    const formData = new FormData();
    const blob = new Blob(['Audio falso'], { type : 'audio/wav' });
    formData.append('display_name' , 'Mi sample');
    formData.append('audioFile',blob,'test.wav');

    const listResponse = await fetch('/api/samples/upload',{
        method: 'POST',
        headers: {'Authorization' : 'Bearer ' + token},
        body: formData
    });

    const responseData = await listResponse.json();
    testUtils.log(responseData);

    if(listResponse.status == 400){
        testUtils.setSuccess(btn);
    }
});