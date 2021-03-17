package com.lalofcaunam.estudiafca.Login;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.auth0.android.jwt.JWT;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.lalofcaunam.estudiafca.API.JsonApi;
import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.Modelos.Login;
import com.lalofcaunam.estudiafca.Modelos.ResultResponse;
import com.lalofcaunam.estudiafca.Profesor.CuestionariosProfesor;
import com.lalofcaunam.estudiafca.R;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.ResponseBody;
import okio.BufferedSource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    Button btnIniciarSesion, btnRegistrarse, btnOlvidoContraseña;
    EditText editTextCorreo, editTextPassword;
    String correo, password, token;

    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

    private JsonApi jsonApi;

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
        btnOlvidoContraseña = findViewById(R.id.btnOlvidoContraseña);

        // Listeners
        listeners();
    }


    public void listeners () { // Funcion que inicia acciones listener de eventos

        btnIniciarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correo = editTextCorreo.getText().toString().trim();
                password = editTextPassword.getText().toString().trim();
                if(validacionesLogin(correo, password)) {
                    if(correo.equals("profesor@profesor.com") && password.equals("profesor")){
                        Intent cuestionariosProfesor=new Intent(LoginActivity.this, CuestionariosProfesor.class);
                        startActivity(cuestionariosProfesor);
                    } else if (correo.equals("alumno@alumno.com") && password.equals("alumno")) {
                        Intent cuestionariosAlumno=new Intent(LoginActivity.this, CuestionariosAlumno.class);
                        startActivity(cuestionariosAlumno);
                    } else {
                        //TODO: enque con response tipo Object (Generico)
                        Retrofit retrofit = new Retrofit.Builder()
                                .baseUrl("https://serviciosocial-backend.mybluemix.net/ssfca/api/v1/")
                                .addConverterFactory(GsonConverterFactory.create())
                                .build();

                        jsonApi = retrofit.create(JsonApi.class);

                        Call login = jsonApi.loginUser(new Login(correo, password));

                        login.enqueue(new Callback() {
                            @Override
                            public void onResponse(Call call, Response response) {
                                System.out.println(response);
                                System.out.println(response.body());

                            }

                            @Override
                            public void onFailure(Call call, Throwable t) {

                            }
                        });

                        // TODO: Enque login con response tipo ResultResponse
                    /*login.enqueue(new Callback<ResultResponse>() {
                        @Override
                        public void onResponse(Call<ResultResponse> call, Response<ResultResponse> response) {
                            if(!response.isSuccessful()){
                                System.out.println("Codigo: " + response.code() + "\n");
                                System.out.println("Mensaje: " + response.message() + "\n");
                                System.out.println("Mensaje: " + response.body() + "\n");

                                if(response.code() == 404) {
                                    alertaLoginError("Usuario no encontrado", "No se encuentra el usuario favor de intentar nuevamente, o registrarse");
                                } else if (response.code() == 400) {
                                    alertaLoginError("Usuario inactivo", "La cuenta no ha sido activada, por favor revisa tu correo electrónico. \n En algunos casos el correo de verificación puede irse a la carpeta de Spam o Correo no deseado.");
                                } else {
                                    alertaLoginError("Error", "Ocurrió un error con el servicio, intentelo más tarde");
                                }

                                return;
                            }

                            System.out.println("Response: " + response + "\n");
                            //token = response.message();
                            //System.out.println("Token: " + response.body().getMessage());

                            //JWT parsedJWT = new JWT(token);
                            //System.out.println(parsedJWT.toString());

                            alertaLoginExitoso("Iniciando Sesión", "Por favor, espere...");
                        }

                        @Override
                        public void onFailure(Call<ResultResponse> call, Throwable t) {

                        }
                    });*/


                        // TODO: Intento con Volley
                    /*RequestQueue myrequest = Volley.newRequestQueue(getApplicationContext());
                    try {
                        JSONObject json = new JSONObject();
                        json.put("correo", correo);
                        json.put("contrasenia", password);

                        JSONObject notification = new JSONObject();
                        notification.put("body", json);

                        json.put("notification", notification);

                        String URL = "https://serviciosocial-backend.mybluemix.net/ssfca/api/v1/usuarios/login";

                        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, URL, json, null, null) {
                            @Override
                            public Map<String, String> getHeaders() {
                                Map<String, String> header = new HashMap<>();
                                header.put("Content-Type", "application/json");
                                header.put("Accept", "application/json");
                                return header;
                            }
                        };

                        myrequest.add(request);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }*/
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


        btnOlvidoContraseña.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, ResetPassword.class));
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
        } else if (!email.matches(emailPattern)){
            mostrarAlertaSimple("Correo Electrónico Erróneo", "Por favor, ingresa una dirección correo electrónico válido");
            editTextCorreo.setError("Ingresa un correo válido");
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

    public void alertaLoginExitoso(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

    public void alertaLoginError(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

}