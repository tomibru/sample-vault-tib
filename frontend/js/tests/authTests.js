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

