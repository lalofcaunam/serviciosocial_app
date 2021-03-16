package com.lalofcaunam.estudiafca.Login;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class EmailVerificationActivity extends AppCompatActivity {

    TextView textEmailVerification;
    Button btnOkVerificar;
    String correo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_email_verification);

        initComponents();
    }

    public void initComponents(){
        Bundle extrasCorreo = getIntent().getExtras();
        correo = extrasCorreo.getString("correo");

        textEmailVerification = findViewById(R.id.textEmailVerification);
        btnOkVerificar = findViewById(R.id.btnOkVerificar);

        putData();
        listeners();
    }

    public void putData(){
        textEmailVerification.setText("Se ha enviado un link de confirmación a tu correo '" + correo + "', favor de ingresar a tu correo electrónico y validar la creación de tu cuenta. \n En algunos casos el correo de verificación puede irse a la carpeta de Spam o Correo no deseado.");
    }

    public void listeners(){
        btnOkVerificar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(EmailVerificationActivity.this, LoginActivity.class));
                finish();
            }
        });
    }

}
