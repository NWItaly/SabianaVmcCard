/**
 * Configurazione della card
 */
export interface SabianaVmcCardConfig {
    type: string;
    entity_prefix?: string;
}

/**
 * Entity utilizzate nella card, con prefisso dinamico
 */
const ENTITY_BASE = {
    model: 'sensor.@prefix@_blk0_controller_model'
    , temp_external: 'sensor.@prefix@_blk1_temperature_t1'
    , temp_in: 'sensor.@prefix@_blk1_temperature_t3'
    , temp_flow: 'sensor.@prefix@_blk1_temperature_t2'
    , temp_disposal: 'sensor.@prefix@_blk1_temperature_t4'
    , power: 'switch.@prefix@_vmc_power'
    , mode: 'sensor.@prefix@_blk3_mode_selection'
    , mode_command_manual: 'switch.@prefix@_mode_command_manual'
    , mode_command_holiday: 'switch.@prefix@_mode_command_holiday'
    , mode_command_party: 'switch.@prefix@_mode_command_party'
    , mode_command_program: 'switch.@prefix@_mode_command_program'
    , mode_command_auto: 'switch.@prefix@_mode_command_auto'
    , fan_speed: 'number.@prefix@_vmc_manual_speed'
    , speed_1: 'sensor.@prefix@_blk2_speed_1'
    , speed_2: 'sensor.@prefix@_blk2_speed_2'
    , speed_3: 'sensor.@prefix@_blk2_speed_3'
    , speed_4: 'sensor.@prefix@_blk2_speed_4'
    , duty_cycle_fan_1: 'sensor.@prefix@_blk1_duty_cycle_fan_1'
    , program: 'number.@prefix@_vmc_timer_progr_selection'
    , boost: 'binary_sensor.@prefix@_blk1_boost_active'
    , flush: 'switch.@prefix@_blk2_flush_mode'
    , bypass: 'binary_sensor.@prefix@_blk1_bypass_active'
    , bypass_mode: 'sensor.@prefix@_blk1_free_cooling_free_heating'
    , defrost: 'binary_sensor.@prefix@_blk1_defrost_cycle_active'
    , t1_probe_failure: 'binary_sensor.@prefix@_blk1_t1_probe_failure'
    , t2_probe_failure: 'binary_sensor.@prefix@_blk1_t2_probe_failure'
    , t3_probe_failure: 'binary_sensor.@prefix@_blk1_t3_probe_failure'
    , t4_probe_failure: 'binary_sensor.@prefix@_blk1_t4_probe_failure'
    , timekeeper_failure: 'binary_sensor.@prefix@_blk1_timekeeper_failure'
    , frost_alarm_t1_probe: 'binary_sensor.@prefix@_blk1_frost_alarm'
    , frost_alarm_t2_probe: 'binary_sensor.@prefix@_blk1_frost_alarm_t2_probe'
    , fireplace_alarm: 'binary_sensor.@prefix@_blk1_fireplace_alarm'
    , pressure_transducer_failure: 'binary_sensor.@prefix@_blk1_pressure_transducer_failure'
    , filter_alarm: 'binary_sensor.@prefix@_blk1_filter_alarm'
    , fans_failure: 'binary_sensor.@prefix@_blk1_fans_failure'
    , rh_or_co2_sensor_failure: 'binary_sensor.@prefix@_blk1_rh_or_co2_sensor_failure'
    , fan_thermic_input_alarm: 'binary_sensor.@prefix@_blk1_fan_thermic_input_alarm'
    , pre_heating_alarm: 'binary_sensor.@prefix@_blk1_pre_heating_alarm'
    , pre_frost_alarm_t2: 'binary_sensor.@prefix@_blk1_pre_frost_alarm_t2'
    , holiday_mode_days: 'number.@prefix@_vmc_holiday_mode_days'
    , temp_for_free_cooling: 'number.@prefix@_blk2_temp_for_free_cooling_set'
    , temp_for_free_heating: 'number.@prefix@_blk2_temp_for_free_heating_set'
    , boost_time: 'number.@prefix@_blk2_boost_time'
    , filter_counter: 'sensor.@prefix@_blk1_filter_counter_divided_by_15_minutes'
    , filter_life: 'number.@prefix@_blk2_filter_life'
    , reset_filter_counter: 'button.@prefix@_reset_filter_counter'
    // user timer program
    , service_utp_refresh: '@prefix@_blk4_user_timer_program_refresh'
    , service_utp_write: '@prefix@_blk4_user_timer_program_write'
    // user timer program 1
    , utp1_d1: 'sensor.@prefix@_blk4_user_timer_program_1_day_1'
    , utp1_d2: 'sensor.@prefix@_blk4_user_timer_program_1_day_2'
    , utp1_d3: 'sensor.@prefix@_blk4_user_timer_program_1_day_3'
    , utp1_d4: 'sensor.@prefix@_blk4_user_timer_program_1_day_4'
    , utp1_d5: 'sensor.@prefix@_blk4_user_timer_program_1_day_5'
    , utp1_d6: 'sensor.@prefix@_blk4_user_timer_program_1_day_6'
    , utp1_d7: 'sensor.@prefix@_blk4_user_timer_program_1_day_7'
    // user timer program 2
    , utp2_d1: 'sensor.@prefix@_blk4_user_timer_program_2_day_1'
    , utp2_d2: 'sensor.@prefix@_blk4_user_timer_program_2_day_2'
    , utp2_d3: 'sensor.@prefix@_blk4_user_timer_program_2_day_3'
    , utp2_d4: 'sensor.@prefix@_blk4_user_timer_program_2_day_4'
    , utp2_d5: 'sensor.@prefix@_blk4_user_timer_program_2_day_5'
    , utp2_d6: 'sensor.@prefix@_blk4_user_timer_program_2_day_6'
    , utp2_d7: 'sensor.@prefix@_blk4_user_timer_program_2_day_7'
    // user timer program 3
    , utp3_d1: 'sensor.@prefix@_blk4_user_timer_program_3_day_1'
    , utp3_d2: 'sensor.@prefix@_blk4_user_timer_program_3_day_2'
    , utp3_d3: 'sensor.@prefix@_blk4_user_timer_program_3_day_3'
    , utp3_d4: 'sensor.@prefix@_blk4_user_timer_program_3_day_4'
    , utp3_d5: 'sensor.@prefix@_blk4_user_timer_program_3_day_5'
    , utp3_d6: 'sensor.@prefix@_blk4_user_timer_program_3_day_6'
    , utp3_d7: 'sensor.@prefix@_blk4_user_timer_program_3_day_7'
    // user timer program 4
    , utp4_d1: 'sensor.@prefix@_blk4_user_timer_program_4_day_1'
    , utp4_d2: 'sensor.@prefix@_blk4_user_timer_program_4_day_2'
    , utp4_d3: 'sensor.@prefix@_blk4_user_timer_program_4_day_3'
    , utp4_d4: 'sensor.@prefix@_blk4_user_timer_program_4_day_4'
    , utp4_d5: 'sensor.@prefix@_blk4_user_timer_program_4_day_5'
    , utp4_d6: 'sensor.@prefix@_blk4_user_timer_program_4_day_6'
    , utp4_d7: 'sensor.@prefix@_blk4_user_timer_program_4_day_7'

} as const;

/**
 * Tipi delle entità con prefisso dinamico
 */
export type SabianaEntities = {
    [K in keyof typeof ENTITY_BASE]: string
};

/**
 * Factory per generare i valori con prefisso dinamico
 * @param prefix prefisso specifico per l'instanza
 * @returns 
 */
export function createSabianaEntities(prefix: string): SabianaEntities {
    const entries = Object.entries(ENTITY_BASE).map(([key, val]) => [
        key, val.replace('@prefix@', prefix)
    ]);
    return Object.fromEntries(entries) as SabianaEntities;
}