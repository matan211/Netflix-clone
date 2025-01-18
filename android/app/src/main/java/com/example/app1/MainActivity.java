package com.example.app1;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.text.InputType;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

// This is the login screen
public class MainActivity extends Activity {

    private MediaPlayer mediaPlayer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize MediaPlayer with your audio file
        mediaPlayer = MediaPlayer.create(this, R.raw.song1);
        mediaPlayer.setLooping(true); // Set looping repeat
        mediaPlayer.start(); // Start playback

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
        passwordInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
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

        // "New? Sign Up" Button
        Button signUpButton = new Button(this);
        signUpButton.setText("New? Sign Up");
        signUpButton.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        signUpButton.setBackgroundColor(Color.parseColor("#1F1F1F"));
        signUpButton.setTextColor(Color.WHITE);
        signUpButton.setPadding(20, 20, 20, 20);
        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to Sign Up Activity
                Intent intent = new Intent(MainActivity.this, SignupActivity.class);
                startActivity(intent);
            }
        });
        rootLayout.addView(signUpButton);

        // Set the layout as the content view
        setContentView(R.layout.activity_loginactivity);

        // Call the method to set up the button
        setSignupButton();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // Release the MediaPlayer when the activity is destroyed
        if (mediaPlayer != null) {
            mediaPlayer.release();
        }
    }

    private void setSignupButton() {
        // Find the button by its ID
        Button signupButton = findViewById(R.id.signupButton);

        // Set an OnClickListener for the button
        signupButton.setOnClickListener(v -> {
            // Create an Intent to navigate to SignupActivity
            Intent intent = new Intent(MainActivity.this, SignupActivity.class);
            startActivity(intent); // Start the new activity
        });
    }
}
