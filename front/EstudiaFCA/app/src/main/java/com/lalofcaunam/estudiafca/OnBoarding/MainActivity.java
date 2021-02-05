package com.lalofcaunam.estudiafca.OnBoarding;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.viewpager2.widget.ViewPager2;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.google.android.material.button.MaterialButton;
import com.lalofcaunam.estudiafca.HomeActivity;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private OnBoardingAdapter onBoardingAdapter;
    private LinearLayout layoutOnboardingIndicators;
    private MaterialButton buttonOnBoardingAction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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

        buttonOnBoardingAction.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(onboardingViewPager.getCurrentItem() + 1 < onBoardingAdapter.getItemCount()){
                    onboardingViewPager.setCurrentItem(onboardingViewPager.getCurrentItem() + 1);
                } else {
                    startActivity(new Intent(getApplicationContext(), LoginActivity.class));
                    finish();
                }
            }
        });

    }

    private void setupOnboardingItems(){

        List<OnBoardingItem> onBoardingItems = new ArrayList<>();

        OnBoardingItem itemPayOnline = new OnBoardingItem();
        itemPayOnline.setTitle("Boarding 1");
        itemPayOnline.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus urna at pellentesque tincidunt. Nullam tincidunt lacus aliquet ultricies euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.");
        itemPayOnline.setImage(R.drawable.estudia);

        OnBoardingItem itemNext = new OnBoardingItem();
        itemNext.setTitle("Boarding 2");
        itemNext.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus urna at pellentesque tincidunt. Nullam tincidunt lacus aliquet ultricies euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.");
        itemNext.setImage(R.drawable.estudia);

        onBoardingItems.add(itemPayOnline);
        onBoardingItems.add(itemNext);

        onBoardingAdapter = new OnBoardingAdapter(onBoardingItems);
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
                buttonOnBoardingAction.setText("Start");
            } else {
                buttonOnBoardingAction.setText("Next");
            }
        }
    }
}