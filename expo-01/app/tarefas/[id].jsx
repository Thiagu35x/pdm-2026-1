import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getTarefa, atualizarTarefa, removerTarefa } from "../../back4app";

export default function TarefaDetalhesPage() {
    // ... seu código de lógica de tarefas aqui
}