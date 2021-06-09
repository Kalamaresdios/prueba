package com.prueba
import android.content.Context
import android.os.Build
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.*

class CustomNative(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String { return "CustomNative" }


    @ReactMethod
    fun Sumar(cb : Callback){
        val num=2+2
        cb.invoke(num.toString())
    }

    companion object {
        private val DURATION_SHORT_KEY = "SHORT"
        private val DURATION_LONG_KEY = "LONG"
    }
}
