package com.lalofcaunam.estudiafca.OnBoarding;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.viewpager2.widget.ViewPager2;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.google.android.material.button.MaterialButton;
import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.HomeActivity;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.Profesor.CuestionariosProfesor;
import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private OnBoardingAdapter onBoardingAdapter;
    private LinearLayout layoutOnboardingIndicators;
    private MaterialButton buttonOnBoardingAction;

    private SharedPreferences showBoarding;

    String rol;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        showBoarding = getSharedPreferences("showBoarding", MODE_PRIVATE);

        Bundle extras = getIntent().getExtras();
        rol = extras.getString("rol", "");

        layoutOnboardingIndicators = findViewById(R.id.layoutOnBoardingIndicators);
        buttonOnBoardingAction = findViewById(R.id.buttonOnBoarding);

        setupOnboardingItems();
        ViewPager2 onboardingViewPager = findViewById(R.id.onBoardingViewPager);
        onboardingViewPager.setAdapter(onBoardingAdapter);

        setupOnboardingIndicators();
        setCurrentOnboardingIndicator(0);

        onboardingViewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                setCurrentOnboardingIndicator(position);
            }
        });

        SharedPreferences.Editor editorBoarding = showBoarding.edit();

        buttonOnBoardingAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(onboardingViewPager.getCurrentItem() + 1 < onBoardingAdapter.getItemCount()){
                    onboardingViewPager.setCurrentItem(onboardingViewPager.getCurrentItem() + 1);
                } else {
                    editorBoarding.putBoolean("isFirst", false);
                    editorBoarding.apply();
                    if(rol.equals("profesor")){
                        startActivity(new Intent(getApplicationContext(), CuestionariosProfesor.class));
                        finish();
                    } else {
                        startActivity(new Intent(getApplicationContext(), CuestionariosAlumno.class));
                        finish();
                    }
                }
            }
        });

    }

    private void setupOnboardingItems(){

        List<OnBoardingItem> onBoardingItems = new ArrayList<>();

        //Profesor
        if(rol.equals("profesor")){
            OnBoardingItem item = new OnBoardingItem();
            item.setTitle("");
            item.setDescription("Bienvenido PROFESOR, Con EstudiaFCA podrás...");
            item.setImage(R.drawable.board1);

            OnBoardingItem itemNext = new OnBoardingItem();
            itemNext.setTitle("");
            itemNext.setDescription("..Crear cuestionarios de los distintos temas de su asignatura..");
            itemNext.setImage(R.drawable.board2);

            OnBoardingItem itemNext2 = new OnBoardingItem();
            itemNext2.setTitle("");
            itemNext2.setDescription("..Agregar preguntas y respuestas a sus cuestionarios..");
            itemNext2.setImage(R.drawable.board3);

            OnBoardingItem itemNext3 = new OnBoardingItem();
            itemNext3.setTitle("");
            itemNext3.setDescription("..Activar y desactivar la visibilidad de sus cuestionarios..");
            itemNext3.setImage(R.drawable.board4);

            OnBoardingItem itemNext4 = new OnBoardingItem();
            itemNext4.setTitle("");
            itemNext4.setDescription(".. Y visualizar los resultados de los alumnos que realicen sus cuestionarios.");
            itemNext4.setImage(R.drawable.board5);

            onBoardingItems.add(item);
            onBoardingItems.add(itemNext);
            onBoardingItems.add(itemNext2);
            onBoardingItems.add(itemNext3);
            onBoardingItems.add(itemNext4);

            onBoardingAdapter = new OnBoardingAdapter(onBoardingItems);

        } else {
            //Alumno
            OnBoardingItem item = new OnBoardingItem();
            item.setTitle("");
            item.setDescription("Bienvenido ALUMNO, Con EstudiaFCA podrás...");
            item.setImage(R.drawable.board1);

            OnBoardingItem itemNext = new OnBoardingItem();
            itemNext.setTitle("");
            itemNext.setDescription("..Visuarlizar los cuestionarios que los profesores de distintas Licenciaturas y asignaturas ha creado");
            itemNext.setImage(R.drawable.board2);

            OnBoardingItem itemNext2 = new OnBoardingItem();
            itemNext2.setTitle("");
            itemNext2.setDescription("..Realizar cuantas veces requieras los cuestionarios que tu decidas..");
            itemNext2.setImage(R.drawable.board3);

            OnBoardingItem itemNext3 = new OnBoardingItem();
            itemNext3.setTitle("");
            itemNext3.setDescription(".. Y visualizar tus resultados de cada cuestionario que haz realizado.");
            itemNext3.setImage(R.drawable.board4);

            onBoardingItems.add(item);
            onBoardingItems.add(itemNext);
            onBoardingItems.add(itemNext2);
            onBoardingItems.add(itemNext3);

            onBoardingAdapter = new OnBoardingAdapter(onBoardingItems);
        }

    }

    private void setupOnboardingIndicators() {
        ImageView[] indicators = new ImageView[onBoardingAdapter.getItemCount()];
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT
        );
        layoutParams.setMargins(8,0,8,0);
        for (int i = 0; i< indicators.length; i ++){
            indicators[i] = new ImageView(getApplicationContext());
            indicators[i].setImageDrawable(ContextCompat.getDrawable(
                    getApplicationContext(),
                    R.drawable.onboarding_indicator_inactive
            ));
            indicators[i].setLayoutParams(layoutParams);
            layoutOnboardingIndicators.addView(indicators[i]);
        }
    }


    private void setCurrentOnboardingIndicator(int index){
        int childCount = layoutOnboardingIndicators.getChildCount();
        for(int i = 0; i < childCount; i++){
            ImageView imageView = (ImageView)layoutOnboardingIndicators.getChildAt(i);
            if(i == index){
                imageView.setImageDrawable(
                        ContextCompat.getDrawable(getApplicationContext(), R.drawable.onboarding_indicator_active)
                );
            } else {
                imageView.setImageDrawable(
                        ContextCompat.getDrawable(getApplicationContext(), R.drawable.onboarding_indicator_inactive)
                );
            }

            if(index == onBoardingAdapter.getItemCount() - 1){
                buttonOnBoardingAction.setText("Empezar");
            } else {
                buttonOnBoardingAction.setText("Siguiente");
            }
        }
    }
}