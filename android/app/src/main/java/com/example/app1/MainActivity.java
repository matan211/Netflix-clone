package com.example.app1;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.Color;
import android.util.TypedValue;

// this is login screen
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set up the root layout
        LinearLayout rootLayout = new LinearLayout(this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setBackgroundColor(Color.parseColor("#121212"));
        rootLayout.setPadding(50, 100, 50, 100);

        // App Title
        TextView appTitle = new TextView(this);
        appTitle.setText("MitkademFlix");
        appTitle.setTextSize(TypedValue.COMPLEX_UNIT_SP, 42);
        appTitle.setTextColor(Color.WHITE);
        appTitle.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
        rootLayout.addView(appTitle);

        // Username Field
        EditText usernameInput = new EditText(this);
        usernameInput.setHint("Username");
        usernameInput.setHintTextColor(Color.GRAY);
        usernameInput.setTextColor(Color.WHITE);
        usernameInput.setBackgroundColor(Color.parseColor("#1F1F1F"));
        usernameInput.setPadding(20, 20, 20, 20);
        usernameInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        rootLayout.addView(usernameInput);

        // Password Field
        EditText passwordInput = new EditText(this);
        passwordInput.setHint("Password");
        passwordInput.setHintTextColor(Color.GRAY);
        passwordInput.setTextColor(Color.WHITE);
        passwordInput.setBackgroundColor(Color.parseColor("#1F1F1F"));
        passwordInput.setPadding(20, 20, 20, 20);
        passwordInput.setTextSize(TypedValue.COMPLEX_UNIT_SP, 18);
        passwordInput.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_VARIATION_PASSWORD);
        rootLayout.addView(passwordInput);

        // Login Button
        Button loginButton = new Button(this);
        loginButton.setText("Log In");
        loginButton.setTextSize(TypedValue.COMPLEX_UNIT_SP, 24);
        loginButton.setBackgroundColor(Color.parseColor("#E50914"));
        loginButton.setTextColor(Color.WHITE);
        loginButton.setPadding(20, 20, 20, 20);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Simulate login and navigate to Home Screen
                Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                startActivity(intent);
            }
        });
        rootLayout.addView(loginButton);

        setContentView(R.layout.activity_loginactivity);
    }
}
