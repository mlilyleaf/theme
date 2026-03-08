// C# Demo - Configuration Manager
// This script demonstrates C# syntax highlighting in the Ravin theme

using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text.Json;

namespace ConfigurationDemo
{
    /// <summary>
    /// Manages application configuration settings
    /// </summary>
    public class ConfigManager
    {
        private const string CONFIG_FILE = "config.json";
        private Dictionary<string, object> _settings;

        /// <summary>
        /// Initialize configuration manager
        /// </summary>
        public ConfigManager()
        {
            _settings = new Dictionary<string, object>();
        }

        /// <summary>
        /// Load configuration from file
        /// </summary>
        /// <returns>True if loaded successfully</returns>
        public bool LoadConfiguration()
        {
            try
            {
                if (!File.Exists(CONFIG_FILE))
                {
                    Console.WriteLine("Configuration file not found.");
                    return false;
                }

                string json = File.ReadAllText(CONFIG_FILE);
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                _settings = JsonSerializer.Deserialize<Dictionary<string, object>>(json, options);
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading configuration: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// Get a configuration value
        /// </summary>
        public object GetSetting(string key, object defaultValue = null)
        {
            return _settings.ContainsKey(key) ? _settings[key] : defaultValue;
        }

        /// <summary>
        /// Set a configuration value
        /// </summary>
        public void SetSetting(string key, object value)
        {
            _settings[key] = value;
        }

        /// <summary>
        /// Display all settings
        /// </summary>
        public void DisplaySettings()
        {
            Console.WriteLine("=== Configuration Settings ===");
            foreach (var kvp in _settings)
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}");
            }
        }

        /// <summary>
        /// Main program
        /// </summary>
        static void Main(string[] args)
        {
            var config = new ConfigManager();
            
            // Load and display configuration
            if (config.LoadConfiguration())
            {
                config.DisplaySettings();
            }
            else
            {
                // Use default settings
                config.SetSetting("AppName", "Demo Application");
                config.SetSetting("Version", "1.0.0");
                config.SetSetting("Debug", true);
                config.DisplaySettings();
            }
        }
    }
}
