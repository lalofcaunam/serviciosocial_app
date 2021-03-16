package com.lalofcaunam.estudiafca.Login;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.API.JsonApi;
import com.lalofcaunam.estudiafca.Modelos.Login;
import com.lalofcaunam.estudiafca.Modelos.ResetPass;
import com.lalofcaunam.estudiafca.Modelos.ResultResponse;
import com.lalofcaunam.estudiafca.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ResetPassword extends AppCompatActivity {

    EditText editTextResetPass;
    Button btnResetPassword;
    String correo;

    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

    private JsonApi jsonApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reset_password);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        initComponents();
    }

    public void initComponents(){

        editTextResetPass = findViewById(R.id.editTextResetPass);
        btnResetPassword = findViewById(R.id.btnResetPassword);

        listeners();
    }

    public void listeners(){
        btnResetPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correo = editTextResetPass.getText().toString().trim();
                if(correo.isEmpty() || correo.equals("")) {
                    editTextResetPass.setFocusable(true);
                    alertaFormulario("Falta Correo Electrónico", "Por favor, ingresa tu correo electrónico");
                } else if(!correo.matches(emailPattern)){
                    editTextResetPass.setError("Ingresa un correo válido");
                    editTextResetPass.setFocusable(true);
                    alertaFormulario("Correo Electrónico Erróneo", "Por favor, ingresa una dirección correo electrónico válido");
                } else {
                    resetPassword(correo);
                }
            }
        });
    }

    public void resetPassword(String correo){
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://serviciosocial-backend.mybluemix.net/ssfca/api/v1/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        jsonApi = retrofit.create(JsonApi.class);

        Call<ResultResponse> reset = jsonApi.resetPassword(new ResetPass(correo));

        reset.enqueue(new Callback<ResultResponse>() {
            @Override
            public void onResponse(Call<ResultResponse> call, Response<ResultResponse> response) {

                if(!response.isSuccessful() || response.code() == 400){
                    System.out.println("Codigo: " + response.code() + "\n");
                    System.out.println("Mensaje: " + response.message() + "\n");
                    alertaFormulario("Ocurrió un error", "Por favor intentelo más tarde");
                    return;
                }

                System.out.println("Codigo: " + response.code() + "\n");
                System.out.println("Mensaje: " + response.message() + "\n");

                alertaReset("Cambio de contraseña", "Se ha enviado un link a tu correo '" + correo + "' con el cual podrás cambiar tu contraseña. \n En algunos casos el correo de cambio de contraseña puede irse a la carpeta de Spam o Correo no deseado.");
            }

            @Override
            public void onFailure(Call<ResultResponse> call, Throwable t) {

            }
        });
    }

    public void alertaReset(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(ResetPassword.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        Intent emailVerification = new Intent(ResetPassword.this, LoginActivity.class);
                        finish();
                    }
                });
        alertDialog.show();
    }

    public void alertaFormulario(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(ResetPassword.this).create();
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
