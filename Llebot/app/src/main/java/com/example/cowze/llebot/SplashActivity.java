package com.example.cowze.llebot;

        import android.app.Activity;
        import android.content.Intent;
        import android.drm.DrmStore;
        import android.os.Bundle;
        import android.support.v7.app.AppCompatActivity;

/**
 * Created by 함현지 on 2018-02-05.
 */

public class SplashActivity extends AppCompatActivity {
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        try{
            Thread.sleep(4000);
        }catch(InterruptedException e){
            e.printStackTrace();
        }
        startActivity(new Intent(this,MainActivity.class));
        finish();
    }
}

