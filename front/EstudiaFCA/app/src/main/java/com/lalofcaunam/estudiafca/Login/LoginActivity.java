package com.lalofcaunam.estudiafca.Login;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.lalofcaunam.estudiafca.Alumno.Cuestionarios;
import com.lalofcaunam.estudiafca.R;

public class LoginActivity extends AppCompatActivity {

    Button btnIniciarSesion, btnRegistrarse;
    EditText editTextCorreo, editTextPassword;
    String correo, password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initComponents();
    }


    public void initComponents() { // Funcion que inicia los componentes de la vista activity_login
        // Inputs
        editTextCorreo = findViewById(R.id.editTextCorreo);
        editTextPassword = findViewById(R.id.editTextPassword);

        // Botones
        btnIniciarSesion = findViewById(R.id.btnIniciarSesion);
        btnRegistrarse = findViewById(R.id.btnRegistrarse);

        // Listeners
        listeners();
    }


    public void listeners () { // Funcion que inicia acciones listener de eventos

        btnIniciarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correo = editTextCorreo.getText().toString();
                password = editTextPassword.getText().toString();
                if(validacionesLogin(correo, password)) {
                    if(correo.equals("profesor") && password.equals("profesor")){
                        Intent cuestionariosProfesor=new Intent(LoginActivity.this,Cuestionarios.class);
                        cuestionariosProfesor.putExtra("rol", "profesor");
                        startActivity(cuestionariosProfesor);
                    } else if (correo.equals("alumno") && password.equals("alumno")) {
                        Intent cuestionariosAlumno=new Intent(LoginActivity.this,Cuestionarios.class);
                        cuestionariosAlumno.putExtra("rol", "alumno");
                        startActivity(cuestionariosAlumno);
                    } else {
                        mostrarAlertaSimple("Usuario no encontrado", "No se encuentra el usuario favor de intentar nuevamente, o registrarse");
                    }
                }
            }
        });

        btnRegistrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, ProfileActivity.class));
            }
        });

    }


    public boolean validacionesLogin(String email, String password) {
        if ((email.trim().isEmpty() || email == "") && (password.trim().isEmpty() || password == "")){
            mostrarAlertaSimple("No ha ingresado correo y contraseña", "Por favor, ingrese un correo electrónico y contraseña");
            editTextCorreo.setError("Campo obligatorio");
            editTextPassword.setError("Campo obligatorio");
            return false;
        } else if(email.trim().isEmpty() || email == ""){
            mostrarAlertaSimple("No ha ingresado correo electrónico", "Por favor, ingrese un correo electrónico");
            editTextCorreo.setError("Campo obligatorio");
            return false;
        } else if (password.trim().isEmpty() || password == ""){
            mostrarAlertaSimple("No ha ingresado contraseña", "Por favor, ingrese una contraseña");
            editTextPassword.setError("Campo obligatorio");
            return false;
        }
        return true;
    }

    public void mostrarAlertaSimple(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

}